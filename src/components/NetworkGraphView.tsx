import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Vereador, FornecedorResumo, AssessorGabinete } from '../types';
import { CouncilorAvatar } from './CouncilorAvatar';
import {
  Network,
  Car,
  Fuel,
  Megaphone,
  Briefcase,
  Users,
  Search,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Building2,
  ExternalLink,
  Filter,
  Eye,
  Info,
  DollarSign,
  Layers,
  ChevronRight,
  X
} from 'lucide-react';

interface NetworkGraphViewProps {
  vereadores: Vereador[];
  onSelectCouncilor: (vereador: Vereador) => void;
}

type NodeCategory = 'vereador' | 'locadora' | 'posto' | 'comunicacao' | 'consultoria' | 'assessor';

interface GraphNode {
  id: string;
  name: string;
  label: string;
  category: NodeCategory;
  categoryLabel: string;
  color: string;
  size: number;
  // Position
  x: number;
  y: number;
  vx?: number;
  vy?: number;
  // Metadata
  party?: string;
  avatarUrl?: string;
  totalAmount?: number;
  connectedCount?: number;
  councilorRef?: Vereador;
  supplierRef?: FornecedorResumo & { totalCMM: number; gabinetes: { nome: string; id: string; valor: number; partido: string; fotoUrl?: string }[] };
  assessorRef?: AssessorGabinete & { vereadorNome: string; vereadorId: string; partido: string };
}

interface GraphLink {
  id: string;
  source: string;
  target: string;
  value: number;
  label: string;
  type: 'despesa' | 'lotacao';
}

export const NetworkGraphView: React.FC<NetworkGraphViewProps> = ({
  vereadores,
  onSelectCouncilor
}) => {
  // Graph controls
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Filter toggles
  const [filterVereadorId, setFilterVereadorId] = useState<string>('todos');
  const [showLocadoras, setShowLocadoras] = useState(true);
  const [showPostos, setShowPostos] = useState(true);
  const [showComunicacao, setShowComunicacao] = useState(true);
  const [showConsultorias, setShowConsultorias] = useState(true);
  const [showAssessores, setShowAssessores] = useState(true);
  const [assessoresMode, setAssessoresMode] = useState<'selected_only' | 'all'>('selected_only');
  const [onlySharedSuppliers, setOnlySharedSuppliers] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Helper currency
  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Build Supplier Catalog with all councilor connections
  const suppliersCatalog = useMemo(() => {
    const map = new Map<string, {
      cnpj: string;
      razaoSocial: string;
      nomeFantasia: string;
      servico: string;
      cidade: string;
      category: 'locadora' | 'posto' | 'comunicacao' | 'consultoria';
      totalCMM: number;
      gabinetes: { nome: string; id: string; valor: number; partido: string; fotoUrl?: string }[];
    }>();

    vereadores.forEach(v => {
      v.dadosEconomicos.principaisFornecedores.forEach(forn => {
        let cat: 'locadora' | 'posto' | 'comunicacao' | 'consultoria' = 'consultoria';
        const nomeLower = forn.nomeFantasia.toLowerCase();
        const servicoLower = forn.servico.toLowerCase();

        if (nomeLower.includes('locadora') || nomeLower.includes('frotas') || nomeLower.includes('rent a car') || servicoLower.includes('veículos')) {
          cat = 'locadora';
        } else if (nomeLower.includes('posto') || servicoLower.includes('combustível') || servicoLower.includes('gasolina')) {
          cat = 'posto';
        } else if (nomeLower.includes('digital') || nomeLower.includes('mídia') || nomeLower.includes('comunicação') || nomeLower.includes('vídeo')) {
          cat = 'comunicacao';
        } else {
          cat = 'consultoria';
        }

        const existing = map.get(forn.cnpj);
        if (existing) {
          existing.totalCMM += forn.totalRecebido;
          existing.gabinetes.push({
            nome: v.nomeParlamentar,
            id: v.id,
            valor: forn.totalRecebido,
            partido: v.partido,
            fotoUrl: v.fotoUrl
          });
        } else {
          map.set(forn.cnpj, {
            cnpj: forn.cnpj,
            razaoSocial: forn.razaoSocial,
            nomeFantasia: forn.nomeFantasia,
            servico: forn.servico,
            cidade: forn.cidade,
            category: cat,
            totalCMM: forn.totalRecebido,
            gabinetes: [{
              nome: v.nomeParlamentar,
              id: v.id,
              valor: forn.totalRecebido,
              partido: v.partido,
              fotoUrl: v.fotoUrl
            }]
          });
        }
      });
    });

    return Array.from(map.values());
  }, [vereadores]);

  // Compute Nodes and Links
  const { nodes, links } = useMemo(() => {
    const rawNodes: GraphNode[] = [];
    const rawLinks: GraphLink[] = [];

    const centerX = 650;
    const centerY = 500;

    // Filter which councilors are included (respecting whether they held office in this fiscal year)
    const targetVereadores = filterVereadorId === 'todos'
      ? vereadores.filter(v => v.dadosEconomicos.exerciaMandatoNaCMM)
      : vereadores.filter(v => v.id === filterVereadorId);

    // 1. ADD COUNCILOR NODES
    targetVereadores.forEach((v, idx) => {
      // Position around an ellipse
      const angle = (idx / targetVereadores.length) * 2 * Math.PI;
      const radiusX = targetVereadores.length === 1 ? 0 : 360;
      const radiusY = targetVereadores.length === 1 ? 0 : 280;
      const x = targetVereadores.length === 1 ? centerX : centerX + Math.cos(angle) * radiusX;
      const y = targetVereadores.length === 1 ? centerY : centerY + Math.sin(angle) * radiusY;

      rawNodes.push({
        id: `v-${v.id}`,
        name: v.nomeParlamentar,
        label: `${v.nomeParlamentar} (${v.partido})`,
        category: 'vereador',
        categoryLabel: 'Gabinete Parlamentar',
        color: v.corPartido,
        size: 26,
        x,
        y,
        party: v.partido,
        avatarUrl: v.fotoUrl,
        totalAmount: v.dadosEconomicos.ceapGastoTotalAno,
        connectedCount: v.dadosEconomicos.principaisFornecedores.length,
        councilorRef: v
      });

      // 2. ADD STAFF / ASSESSOR NODES (if enabled)
      if (showAssessores) {
        const shouldShowStaff = assessoresMode === 'all' || selectedNodeId === `v-${v.id}` || targetVereadores.length === 1;

        if (shouldShowStaff) {
          // Limit to first 12 or all if single councilor
          const staffToRender = targetVereadores.length === 1 ? v.dadosEconomicos.assessores : v.dadosEconomicos.assessores.slice(0, 7);

          staffToRender.forEach((assessor, aIdx) => {
            const staffAngle = angle + ((aIdx - staffToRender.length / 2) * 0.14);
            const staffDistance = targetVereadores.length === 1 ? 220 : 130;
            const staffX = x + Math.cos(staffAngle) * staffDistance;
            const staffY = y + Math.sin(staffAngle) * staffDistance;

            const staffNodeId = `assessor-${assessor.id}`;
            rawNodes.push({
              id: staffNodeId,
              name: assessor.nome,
              label: `${assessor.nome} (${assessor.nivelCargo})`,
              category: 'assessor',
              categoryLabel: 'Assessor Comissionado',
              color: '#64748b',
              size: 10,
              x: staffX,
              y: staffY,
              totalAmount: assessor.remuneracaoBruta,
              assessorRef: {
                ...assessor,
                vereadorNome: v.nomeParlamentar,
                vereadorId: v.id,
                partido: v.partido
              }
            });

            rawLinks.push({
              id: `link-staff-${staffNodeId}`,
              source: `v-${v.id}`,
              target: staffNodeId,
              value: assessor.remuneracaoBruta,
              label: `${assessor.cargo} (${formatBRL(assessor.remuneracaoBruta)}/mês)`,
              type: 'lotacao'
            });
          });
        }
      }
    });

    // 3. ADD SUPPLIER NODES
    suppliersCatalog.forEach((sup, sIdx) => {
      // Category filter check
      if (sup.category === 'locadora' && !showLocadoras) return;
      if (sup.category === 'posto' && !showPostos) return;
      if (sup.category === 'comunicacao' && !showComunicacao) return;
      if (sup.category === 'consultoria' && !showConsultorias) return;

      // Filter by shared suppliers
      if (onlySharedSuppliers && sup.gabinetes.length <= 1) return;

      // Check if connected to visible councilors
      const connectedCouncilors = sup.gabinetes.filter(g =>
        targetVereadores.some(v => v.id === g.id)
      );

      if (connectedCouncilors.length === 0) return;

      // Position in center hub or orbital depending on category
      const catAngle = (sIdx / suppliersCatalog.length) * 2 * Math.PI;
      const hubRadius = 150 + ((sIdx % 3) * 45);
      const supX = centerX + Math.cos(catAngle) * hubRadius;
      const supY = centerY + Math.sin(catAngle) * hubRadius;

      let color = '#2563eb'; // locadora
      let catLabel = 'Locadora de Veículos';
      if (sup.category === 'posto') {
        color = '#d97706'; // fuel
        catLabel = 'Posto de Combustíveis';
      } else if (sup.category === 'comunicacao') {
        color = '#9333ea'; // media
        catLabel = 'Comunicação & Imprensa';
      } else if (sup.category === 'consultoria') {
        color = '#059669'; // consulting
        catLabel = 'Consultoria Jurídica/Técnica';
      }

      const supNodeId = `sup-${sup.cnpj}`;
      rawNodes.push({
        id: supNodeId,
        name: sup.nomeFantasia,
        label: `${sup.nomeFantasia} (${catLabel})`,
        category: sup.category,
        categoryLabel: catLabel,
        color,
        size: Math.min(32, 16 + connectedCouncilors.length * 2.2),
        x: supX,
        y: supY,
        totalAmount: sup.totalCMM,
        connectedCount: connectedCouncilors.length,
        supplierRef: {
          cnpj: sup.cnpj,
          razaoSocial: sup.razaoSocial,
          nomeFantasia: sup.nomeFantasia,
          servico: sup.servico,
          totalRecebido: sup.totalCMM,
          quantidadeNotas: 20,
          cidade: sup.cidade,
          totalCMM: sup.totalCMM,
          gabinetes: sup.gabinetes
        }
      });

      // Create links between supplier and connected councilors
      connectedCouncilors.forEach(c => {
        rawLinks.push({
          id: `link-${c.id}-${sup.cnpj}`,
          source: `v-${c.id}`,
          target: supNodeId,
          value: c.valor,
          label: `${sup.nomeFantasia} ➔ ${c.nome}: ${formatBRL(c.valor)}`,
          type: 'despesa'
        });
      });
    });

    return { nodes: rawNodes, links: rawLinks };
  }, [
    vereadores,
    suppliersCatalog,
    filterVereadorId,
    showLocadoras,
    showPostos,
    showComunicacao,
    showConsultorias,
    showAssessores,
    assessoresMode,
    onlySharedSuppliers,
    selectedNodeId
  ]);

  // Fast map for finding node by id
  const nodesMap = useMemo(() => {
    const map = new Map<string, GraphNode>();
    nodes.forEach(n => map.set(n.id, n));
    return map;
  }, [nodes]);

  // Highlight logic
  const activeFocusId = hoveredNodeId || selectedNodeId;

  const connectedNodeIds = useMemo(() => {
    if (!activeFocusId) return new Set<string>();
    const set = new Set<string>([activeFocusId]);
    links.forEach(l => {
      if (l.source === activeFocusId) set.add(l.target);
      if (l.target === activeFocusId) set.add(l.source);
    });
    return set;
  }, [activeFocusId, links]);

  // Selected Node Object for details drawer
  const selectedNode = useMemo(() => {
    if (!selectedNodeId) return null;
    return nodesMap.get(selectedNodeId) || null;
  }, [selectedNodeId, nodesMap]);

  // Mouse pan handling
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'circle' || (e.target as HTMLElement).tagName === 'text') return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Zoom handlers
  const handleZoom = (delta: number) => {
    setZoomLevel(prev => Math.min(2.5, Math.max(0.4, prev + delta)));
  };

  const resetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setSelectedNodeId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Explanatory Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <span>Inteligência Relacional da CMM</span>
            <span aria-hidden="true">·</span>
            <span>Grafo de Conexões Econômicas & Pessoal</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Grafo de Vínculos: Gabinetes, Fornecedores e Assessores
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Explore visualmente as ligações de cada parlamentar com locadoras de veículos, postos de combustíveis, agências de publicidade e o quadro de assessores nomeados.
          </p>
        </div>

        {/* Global Network Metrics */}
        <div className="flex items-center gap-3 text-xs bg-slate-50 border border-slate-200 p-3 rounded-xl shrink-0">
          <div className="text-center px-2">
            <span className="text-slate-400 block text-[10px] font-medium uppercase">Gabinetes</span>
            <strong className="text-slate-900 font-mono text-sm">{vereadores.length}</strong>
          </div>
          <div className="w-px h-7 bg-slate-200" />
          <div className="text-center px-2">
            <span className="text-slate-400 block text-[10px] font-medium uppercase">Fornecedores</span>
            <strong className="text-emerald-700 font-mono text-sm">{suppliersCatalog.length}</strong>
          </div>
          <div className="w-px h-7 bg-slate-200" />
          <div className="text-center px-2">
            <span className="text-slate-400 block text-[10px] font-medium uppercase">Vínculos</span>
            <strong className="text-slate-900 font-mono text-sm">{links.length}</strong>
          </div>
        </div>
      </div>

      {/* Main Graph Dashboard Layout: Controls Bar + Graph Canvas + Inspector */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        
        {/* Controls and Filters Strip */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Left filters: Councilors & Search */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Filter by councilor */}
            <select
              value={filterVereadorId}
              onChange={(e) => {
                setFilterVereadorId(e.target.value);
                setSelectedNodeId(null);
              }}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="todos">Todos os Gabinetes com Mandato no Exercício</option>
              {vereadores.map(v => (
                <option key={v.id} value={v.id}>
                  {v.nomeParlamentar} ({v.partido}){!v.dadosEconomicos.exerciaMandatoNaCMM ? ` [Sem Mandato em ${v.dadosEconomicos.ano}]` : ''}
                </option>
              ))}
            </select>

            {/* Quick search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Localizar nó no grafo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600 w-44"
              />
            </div>
          </div>

          {/* Center: Toggle Entity Types */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setShowLocadoras(!showLocadoras)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 transition-colors ${
                showLocadoras ? 'bg-blue-100 text-blue-900 border border-blue-300' : 'bg-slate-100 text-slate-400'
              }`}
            >
              <Car className="w-3.5 h-3.5 text-blue-600" />
              <span>Locadoras</span>
            </button>

            <button
              onClick={() => setShowPostos(!showPostos)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 transition-colors ${
                showPostos ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-slate-100 text-slate-400'
              }`}
            >
              <Fuel className="w-3.5 h-3.5 text-amber-600" />
              <span>Postos</span>
            </button>

            <button
              onClick={() => setShowComunicacao(!showComunicacao)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 transition-colors ${
                showComunicacao ? 'bg-purple-100 text-purple-900 border border-purple-300' : 'bg-slate-100 text-slate-400'
              }`}
            >
              <Megaphone className="w-3.5 h-3.5 text-purple-600" />
              <span>Marketing</span>
            </button>

            <button
              onClick={() => setShowConsultorias(!showConsultorias)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 transition-colors ${
                showConsultorias ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-slate-100 text-slate-400'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
              <span>Consultorias</span>
            </button>

            <button
              onClick={() => setShowAssessores(!showAssessores)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 transition-colors ${
                showAssessores ? 'bg-slate-200 text-slate-900 border border-slate-300 font-semibold' : 'bg-slate-100 text-slate-400'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-slate-600" />
              <span>Assessores</span>
            </button>

            <button
              onClick={() => setOnlySharedSuppliers(!onlySharedSuppliers)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                onlySharedSuppliers ? 'bg-rose-100 text-rose-900 border border-rose-300 font-semibold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Apenas Compartilhados (&gt;1)
            </button>
          </div>

          {/* Right: Zoom controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleZoom(0.15)}
              className="p-1.5 bg-white border border-slate-200 rounded-md hover:bg-slate-100 text-slate-700"
              title="Aumentar Zoom"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleZoom(-0.15)}
              className="p-1.5 bg-white border border-slate-200 rounded-md hover:bg-slate-100 text-slate-700"
              title="Diminuir Zoom"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={resetView}
              className="p-1.5 bg-white border border-slate-200 rounded-md hover:bg-slate-100 text-slate-700"
              title="Resetar Visualização"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Graph Canvas Area + Detail Drawer Split */}
        <div className="relative flex flex-col lg:flex-row h-[650px] w-full overflow-hidden bg-slate-900 select-none">
          
          {/* Interactive SVG Canvas */}
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="flex-1 h-full cursor-grab active:cursor-grabbing relative overflow-hidden"
          >
            {/* Legend Overlay */}
            <div className="absolute top-4 left-4 z-10 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1.5 shadow-lg pointer-events-none">
              <span className="font-bold text-white block text-xs mb-1">Legenda da Rede</span>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
                <span>Locadoras de Veículos</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span>Postos de Combustíveis</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500 inline-block" />
                <span>Comunicação & Audiovisual</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span>Consultorias Jurídicas</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-400 inline-block" />
                <span>Assessores de Gabinete</span>
              </div>
              <div className="pt-1 text-[10px] text-slate-400">
                Passe o mouse ou clique no nó para isolar vínculos.
              </div>
            </div>

            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1300 1000"
              className="w-full h-full"
            >
              <g
                transform={`translate(${panOffset.x}, ${panOffset.y}) scale(${zoomLevel})`}
                transform-origin="center"
              >
                {/* 1. RENDER EDGES / LINKS */}
                {links.map((link) => {
                  const sourceNode = nodesMap.get(link.source);
                  const targetNode = nodesMap.get(link.target);
                  if (!sourceNode || !targetNode) return null;

                  const isHighlighted = activeFocusId
                    ? link.source === activeFocusId || link.target === activeFocusId
                    : false;

                  const isDimmed = activeFocusId && !isHighlighted;

                  const strokeWidth = link.type === 'despesa'
                    ? Math.min(4.5, Math.max(1.2, link.value / 25000))
                    : 1;

                  const strokeColor = link.type === 'lotacao'
                    ? '#475569'
                    : isHighlighted
                    ? '#10b981'
                    : '#334155';

                  return (
                    <line
                      key={link.id}
                      x1={sourceNode.x}
                      y1={sourceNode.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={strokeColor}
                      strokeWidth={isHighlighted ? strokeWidth + 1.5 : strokeWidth}
                      strokeOpacity={isDimmed ? 0.08 : isHighlighted ? 0.95 : 0.4}
                      strokeDasharray={link.type === 'lotacao' ? '3,3' : 'none'}
                    />
                  );
                })}

                {/* 2. RENDER NODES */}
                {nodes.map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  const isHovered = hoveredNodeId === node.id;
                  const isConnected = connectedNodeIds.has(node.id);
                  const isDimmed = activeFocusId ? !isConnected : false;

                  const isMatchSearch = searchTerm.trim().length > 0 &&
                    node.name.toLowerCase().includes(searchTerm.toLowerCase());

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y})`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedNodeId(node.id === selectedNodeId ? null : node.id);
                      }}
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                      className="cursor-pointer transition-transform duration-150"
                      style={{
                        opacity: isDimmed ? 0.2 : 1
                      }}
                    >
                      {/* Pulse halo if search match or selected */}
                      {(isSelected || isMatchSearch) && (
                        <circle
                          r={node.size + 8}
                          fill="none"
                          stroke={node.color}
                          strokeWidth="3"
                          strokeDasharray="4,4"
                          className="animate-spin"
                        />
                      )}

                      {/* Main Node Circle */}
                      <circle
                        r={node.size}
                        fill={node.color}
                        stroke={isSelected ? '#ffffff' : '#0f172a'}
                        strokeWidth={isSelected ? 3 : 1.5}
                        className="transition-all hover:scale-110"
                      />

                      {/* Node Inner Icon / Initial */}
                      {node.category === 'vereador' ? (
                        <text
                          textAnchor="middle"
                          dy=".35em"
                          fill="#ffffff"
                          fontSize="11"
                          fontWeight="bold"
                          pointerEvents="none"
                          fontFamily="sans-serif"
                        >
                          {node.party || node.name.slice(0, 2).toUpperCase()}
                        </text>
                      ) : node.category === 'locadora' ? (
                        <text textAnchor="middle" dy=".35em" fill="#ffffff" fontSize="11" pointerEvents="none">🚗</text>
                      ) : node.category === 'posto' ? (
                        <text textAnchor="middle" dy=".35em" fill="#ffffff" fontSize="11" pointerEvents="none">⛽</text>
                      ) : node.category === 'comunicacao' ? (
                        <text textAnchor="middle" dy=".35em" fill="#ffffff" fontSize="11" pointerEvents="none">📢</text>
                      ) : node.category === 'consultoria' ? (
                        <text textAnchor="middle" dy=".35em" fill="#ffffff" fontSize="11" pointerEvents="none">⚖️</text>
                      ) : (
                        /* Assessor */
                        <circle r={node.size / 2} fill="#ffffff" opacity={0.6} />
                      )}

                      {/* Node Label Below */}
                      {(node.category !== 'assessor' || isConnected || isHovered) && (
                        <text
                          y={node.size + 13}
                          textAnchor="middle"
                          fill={isSelected ? '#34d399' : '#e2e8f0'}
                          fontSize={node.category === 'vereador' ? '12' : node.category === 'assessor' ? '9' : '10'}
                          fontWeight={isSelected || node.category === 'vereador' ? '600' : 'normal'}
                          pointerEvents="none"
                          className="drop-shadow-md select-none font-sans"
                        >
                          {node.name.length > 20 ? `${node.name.slice(0, 18)}...` : node.name}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          {/* Right Side: Detailed Node Inspector Drawer */}
          {selectedNode ? (
            <div className="w-full lg:w-96 bg-white border-l border-slate-200 overflow-y-auto p-5 text-xs text-slate-700 flex flex-col justify-between shrink-0 shadow-xl">
              <div>
                {/* Inspector Header */}
                <div className="flex items-start justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-xs shrink-0"
                      style={{ backgroundColor: selectedNode.color }}
                    >
                      {selectedNode.category === 'vereador' ? selectedNode.party : selectedNode.category === 'locadora' ? '🚗' : selectedNode.category === 'posto' ? '⛽' : selectedNode.category === 'comunicacao' ? '📢' : selectedNode.category === 'consultoria' ? '⚖️' : '👥'}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                        {selectedNode.categoryLabel}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 leading-tight">
                        {selectedNode.name}
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedNodeId(null)}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* COUNCILOR INSPECTOR VIEW */}
                {selectedNode.category === 'vereador' && selectedNode.councilorRef && (
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <CouncilorAvatar
                        fotoUrl={selectedNode.councilorRef.fotoUrl}
                        nomeParlamentar={selectedNode.councilorRef.nomeParlamentar}
                        partido={selectedNode.councilorRef.partido}
                        corPartido={selectedNode.councilorRef.corPartido}
                        numeroUrna={selectedNode.councilorRef.numeroUrna}
                        size="md"
                      />
                      <div>
                        <strong className="block text-slate-900 text-xs">
                          {selectedNode.councilorRef.nomeCompleto}
                        </strong>
                        <span className="text-slate-500 text-[11px] font-mono">
                          {selectedNode.councilorRef.gabinete.numeroSala} · {selectedNode.councilorRef.votos.toLocaleString('pt-BR')} votos
                        </span>
                      </div>
                    </div>

                    {/* Spend stats */}
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <span className="text-slate-400 block text-[10px]">CEAP Liquidado</span>
                        <strong className="text-slate-900 font-mono text-xs">
                          {formatBRL(selectedNode.councilorRef.dadosEconomicos.ceapGastoTotalAno)}
                        </strong>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <span className="text-slate-400 block text-[10px]">Assessores Ativos</span>
                        <strong className="text-slate-900 font-mono text-xs">
                          {selectedNode.councilorRef.gabinete.totalAssessoresAtivos} nomeados
                        </strong>
                      </div>
                    </div>

                    {/* Connected Suppliers */}
                    <div className="space-y-2">
                      <span className="font-bold text-slate-900 block text-xs">
                        Fornecedores Contratados ({selectedNode.councilorRef.dadosEconomicos.principaisFornecedores.length})
                      </span>
                      <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                        {selectedNode.councilorRef.dadosEconomicos.principaisFornecedores.map(f => (
                          <div
                            key={f.cnpj}
                            onClick={() => setSelectedNodeId(`sup-${f.cnpj}`)}
                            className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer border border-slate-100 flex items-center justify-between"
                          >
                            <div>
                              <strong className="block text-slate-800 text-[11px] truncate max-w-[170px]">
                                {f.nomeFantasia}
                              </strong>
                              <span className="text-slate-400 text-[10px] font-mono">{f.cnpj}</span>
                            </div>
                            <span className="font-mono text-emerald-700 font-bold text-[11px]">
                              {formatBRL(f.totalRecebido)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Connected Staff Preview */}
                    <div className="space-y-2">
                      <span className="font-bold text-slate-900 block text-xs">
                        Equipe do Gabinete ({selectedNode.councilorRef.dadosEconomicos.assessores.length})
                      </span>
                      <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                        {selectedNode.councilorRef.dadosEconomicos.assessores.map(a => (
                          <div
                            key={a.id}
                            onClick={() => setSelectedNodeId(`assessor-${a.id}`)}
                            className="p-1.5 rounded-md hover:bg-slate-50 cursor-pointer flex items-center justify-between text-[11px]"
                          >
                            <span className="truncate max-w-[180px] font-medium text-slate-800">{a.nome}</span>
                            <span className="font-mono text-slate-500">{a.nivelCargo}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* SUPPLIER INSPECTOR VIEW */}
                {selectedNode.supplierRef && (
                  <div className="mt-4 space-y-4">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                      <span className="font-mono text-slate-500 text-[11px] block">{selectedNode.supplierRef.cnpj}</span>
                      <p className="font-semibold text-slate-800 text-xs">{selectedNode.supplierRef.razaoSocial}</p>
                      <p className="text-slate-500 text-[11px] leading-relaxed">{selectedNode.supplierRef.servico}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <span className="text-slate-400 block text-[10px]">Faturamento CMM</span>
                        <strong className="text-emerald-700 font-mono text-xs">
                          {formatBRL(selectedNode.supplierRef.totalCMM)}
                        </strong>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <span className="text-slate-400 block text-[10px]">Gabinetes Atendidos</span>
                        <strong className="text-slate-900 font-mono text-xs">
                          {selectedNode.supplierRef.gabinetes.length} vereadores
                        </strong>
                      </div>
                    </div>

                    {/* Which councilors hire this supplier */}
                    <div className="space-y-2">
                      <span className="font-bold text-slate-900 block text-xs">
                        Vereadores que Contratam Este Fornecedor:
                      </span>
                      <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                        {selectedNode.supplierRef.gabinetes.map(g => (
                          <div
                            key={g.id}
                            onClick={() => setSelectedNodeId(`v-${g.id}`)}
                            className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer border border-slate-100 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 text-[11px]">{g.nome}</span>
                              <span className="text-[10px] text-slate-500 font-mono">({g.partido})</span>
                            </div>
                            <span className="font-mono text-slate-900 font-bold text-[11px]">
                              {formatBRL(g.valor)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ASSESSOR INSPECTOR VIEW */}
                {selectedNode.category === 'assessor' && selectedNode.assessorRef && (
                  <div className="mt-4 space-y-4">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Cargo Oficial</span>
                        <strong className="text-slate-900 text-xs block">{selectedNode.assessorRef.cargo}</strong>
                        <span className="text-slate-500 font-mono text-[11px]">Nível: {selectedNode.assessorRef.nivelCargo}</span>
                      </div>

                      <div className="pt-2 border-t border-slate-200">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Gabinete de Lotação</span>
                        <button
                          onClick={() => setSelectedNodeId(`v-${selectedNode.assessorRef?.vereadorId}`)}
                          className="font-bold text-emerald-700 hover:underline text-xs flex items-center gap-1 mt-0.5"
                        >
                          <span>Vereador {selectedNode.assessorRef.vereadorNome} ({selectedNode.assessorRef.partido})</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <span className="text-slate-400 block text-[10px]">Salário Bruto</span>
                        <strong className="text-slate-900 font-mono text-xs">
                          {formatBRL(selectedNode.assessorRef.remuneracaoBruta)}
                        </strong>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <span className="text-slate-400 block text-[10px]">Salário Líquido</span>
                        <strong className="text-slate-600 font-mono text-xs">
                          {formatBRL(selectedNode.assessorRef.remuneracaoLiquida)}
                        </strong>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <span>Nomeado em: <strong className="font-mono text-slate-700">{selectedNode.assessorRef.dataNomeacao}</strong></span>
                      <p className="mt-1">Vínculo comissionado de livre nomeação e exoneração na Câmara Municipal de Manaus.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Inspector Footer CTA */}
              <div className="pt-4 border-t border-slate-200 mt-4">
                {selectedNode.category === 'vereador' && selectedNode.councilorRef && (
                  <button
                    onClick={() => onSelectCouncilor(selectedNode.councilorRef!)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Abrir Dossiê Completo do Gabinete</span>
                  </button>
                )}
                {selectedNode.category !== 'vereador' && (
                  <button
                    onClick={() => setSelectedNodeId(null)}
                    className="w-full py-1.5 text-xs text-slate-500 hover:text-slate-800"
                  >
                    Fechar Detalhes
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Empty Inspector Hint */
            <div className="hidden lg:flex w-80 bg-slate-950/60 backdrop-blur-md border-l border-slate-800 p-6 flex-col justify-center items-center text-center text-slate-400 text-xs">
              <Network className="w-10 h-10 text-slate-600 mb-3" />
              <strong className="text-white text-sm mb-1">Navegue pelas Ligações</strong>
              <p className="leading-relaxed text-[11px] max-w-[200px]">
                Clique em qualquer nó do grafo para auditar quais gabinetes usam a mesma locadora, o mesmo posto ou ver quem são os assessores nomeados.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
