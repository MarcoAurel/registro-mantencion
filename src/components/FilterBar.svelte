<script>
  import { scale, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  
  // Props básicas
  export let filtroEstado = 'todos';
  export let filtroPrioridad = 'todas';
  export let filtroTipo = 'todos';
  export let darkMode = false;
  export let contadores = {};
  
  // Event dispatcher
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  
  // Estados locales para animaciones
  let pressedButton = null;
  
  // Funciones con feedback visual
  function cambiarEstado(estado) {
    filtroEstado = estado;
    dispatch('cambioEstado', estado);
    pressedButton = `estado-${estado}`;
    setTimeout(() => pressedButton = null, 200);
  }
  
  function cambiarPrioridad(prioridad) {
    filtroPrioridad = prioridad;
    dispatch('cambioPrioridad', prioridad);
    pressedButton = `prioridad-${prioridad}`;
    setTimeout(() => pressedButton = null, 200);
  }
  
  function cambiarTipo(tipo) {
    filtroTipo = tipo;
    dispatch('cambioTipo', tipo);
    pressedButton = `tipo-${tipo}`;
    setTimeout(() => pressedButton = null, 200);
  }
  
  function limpiarTodo() {
    filtroEstado = 'todos';
    filtroPrioridad = 'todas';
    filtroTipo = 'todos';
    dispatch('limpiarFiltros');
  }
  
  // Calcular filtros activos
  $: filtrosActivos = [
    filtroEstado !== 'todos' ? 'estado' : null,
    filtroPrioridad !== 'todas' ? 'prioridad' : null,
    filtroTipo !== 'todos' ? 'tipo' : null
  ].filter(Boolean).length;
</script>

<!-- 🌟 FILTER BAR PREMIUM -->
<div class="filter-premium {darkMode ? 'dark' : ''}" in:fly="{{ y: 20, duration: 400, delay: 200 }}">
  
  <!-- ✨ Header mágico con gradiente -->
  {#if filtrosActivos > 0}
    <div class="filter-magic-header" in:fly="{{ y: -10, duration: 300 }}" out:fly="{{ y: -10, duration: 200 }}">
      <div class="magic-content">
        <div class="active-count">
          <span class="count-bubble">{filtrosActivos}</span>
          <span class="count-text">filtro{filtrosActivos !== 1 ? 's' : ''} activo{filtrosActivos !== 1 ? 's' : ''}</span>
        </div>
        <button 
          class="magic-clear-btn" 
          on:click={limpiarTodo}
          in:scale="{{ duration: 200, delay: 100 }}"
        >
          <span class="clear-icon">🧹</span>
          <span class="clear-text">Limpiar Todo</span>
          <div class="clear-glow"></div>
        </button>
      </div>
    </div>
  {/if}
  
  <!-- 📋 Sección Estado Premium -->
  <div class="filter-premium-section">
    <div class="section-header">
      <span class="section-icon">📋</span>
      <h3 class="section-title">Estado</h3>
      <div class="section-line"></div>
    </div>
    <div class="premium-buttons">
      <button 
        class="premium-btn {filtroEstado === 'todos' ? 'active neutral' : 'inactive'}"
        class:pressed={pressedButton === 'estado-todos'}
        on:click={() => cambiarEstado('todos')}
      >
        <span class="btn-icon">📋</span>
        <span class="btn-label">Todos</span>
        <div class="btn-shine"></div>
      </button>
      
      <button 
        class="premium-btn {filtroEstado === 'pendiente' ? 'active warning' : 'inactive'}"
        class:pressed={pressedButton === 'estado-pendiente'}
        on:click={() => cambiarEstado('pendiente')}
      >
        <span class="btn-icon">⏳</span>
        <span class="btn-label">Pendientes</span>
        <span class="btn-badge">{contadores.pendiente || 0}</span>
        <div class="btn-shine"></div>
      </button>
      
      <button 
        class="premium-btn {filtroEstado === 'en-reparacion' ? 'active processing' : 'inactive'}"
        class:pressed={pressedButton === 'estado-en-reparacion'}
        on:click={() => cambiarEstado('en-reparacion')}
      >
        <span class="btn-icon">🔧</span>
        <span class="btn-label">En Reparación</span>
        <span class="btn-badge">{contadores.enReparacion || 0}</span>
        <div class="btn-shine"></div>
      </button>
      
      <button 
        class="premium-btn {filtroEstado === 'completado' ? 'active success' : 'inactive'}"
        class:pressed={pressedButton === 'estado-completado'}
        on:click={() => cambiarEstado('completado')}
      >
        <span class="btn-icon">✅</span>
        <span class="btn-label">Completados</span>
        <span class="btn-badge">{contadores.completado || 0}</span>
        <div class="btn-shine"></div>
      </button>
    </div>
  </div>
  
  <!-- 🎯 Sección Prioridad Premium -->
  <div class="filter-premium-section">
    <div class="section-header">
      <span class="section-icon">🎯</span>
      <h3 class="section-title">Prioridad</h3>
      <div class="section-line"></div>
    </div>
    <div class="premium-buttons">
      <button 
        class="premium-btn {filtroPrioridad === 'todas' ? 'active neutral' : 'inactive'}"
        class:pressed={pressedButton === 'prioridad-todas'}
        on:click={() => cambiarPrioridad('todas')}
      >
        <span class="btn-icon">🎯</span>
        <span class="btn-label">Todas</span>
        <div class="btn-shine"></div>
      </button>
      
      <button 
        class="premium-btn {filtroPrioridad === 'alta' ? 'active danger' : 'inactive'}"
        class:pressed={pressedButton === 'prioridad-alta'}
        on:click={() => cambiarPrioridad('alta')}
      >
        <span class="btn-icon">🔴</span>
        <span class="btn-label">Alta</span>
        <span class="btn-badge">{contadores.alta || 0}</span>
        <div class="btn-shine"></div>
      </button>
      
      <button 
        class="premium-btn {filtroPrioridad === 'media' ? 'active warning' : 'inactive'}"
        class:pressed={pressedButton === 'prioridad-media'}
        on:click={() => cambiarPrioridad('media')}
      >
        <span class="btn-icon">🟡</span>
        <span class="btn-label">Media</span>
        <span class="btn-badge">{contadores.media || 0}</span>
        <div class="btn-shine"></div>
      </button>
      
      <button 
        class="premium-btn {filtroPrioridad === 'baja' ? 'active success' : 'inactive'}"
        class:pressed={pressedButton === 'prioridad-baja'}
        on:click={() => cambiarPrioridad('baja')}
      >
        <span class="btn-icon">🟢</span>
        <span class="btn-label">Baja</span>
        <span class="btn-badge">{contadores.baja || 0}</span>
        <div class="btn-shine"></div>
      </button>
    </div>
  </div>
  
  <!-- 💻 Sección Tipo Premium -->
  <div class="filter-premium-section">
    <div class="section-header">
      <span class="section-icon">💻</span>
      <h3 class="section-title">Tipo de Equipo</h3>
      <div class="section-line"></div>
    </div>
    <div class="premium-buttons scroll-premium">
      <button 
        class="premium-btn {filtroTipo === 'todos' ? 'active neutral' : 'inactive'}"
        class:pressed={pressedButton === 'tipo-todos'}
        on:click={() => cambiarTipo('todos')}
      >
        <span class="btn-icon">⚙️</span>
        <span class="btn-label">Todos</span>
        <div class="btn-shine"></div>
      </button>
      
      <button 
        class="premium-btn {filtroTipo === 'laptop' ? 'active primary' : 'inactive'}"
        class:pressed={pressedButton === 'tipo-laptop'}
        on:click={() => cambiarTipo('laptop')}
      >
        <span class="btn-icon">💻</span>
        <span class="btn-label">Laptops</span>
        <span class="btn-badge">{contadores.laptop || 0}</span>
        <div class="btn-shine"></div>
      </button>
      
      <button 
        class="premium-btn {filtroTipo === 'desktop' ? 'active secondary' : 'inactive'}"
        class:pressed={pressedButton === 'tipo-desktop'}
        on:click={() => cambiarTipo('desktop')}
      >
        <span class="btn-icon">🖥️</span>
        <span class="btn-label">Desktops</span>
        <span class="btn-badge">{contadores.desktop || 0}</span>
        <div class="btn-shine"></div>
      </button>
      
      <button 
        class="premium-btn {filtroTipo === 'printer' ? 'active accent' : 'inactive'}"
        class:pressed={pressedButton === 'tipo-printer'}
        on:click={() => cambiarTipo('printer')}
      >
        <span class="btn-icon">🖨️</span>
        <span class="btn-label">Impresoras</span>
        <span class="btn-badge">{contadores.printer || 0}</span>
        <div class="btn-shine"></div>
      </button>
      
      <button 
        class="premium-btn {filtroTipo === 'tablet' ? 'active tertiary' : 'inactive'}"
        class:pressed={pressedButton === 'tipo-tablet'}
        on:click={() => cambiarTipo('tablet')}
      >
        <span class="btn-icon">📱</span>
        <span class="btn-label">Tablets</span>
        <span class="btn-badge">{contadores.tablet || 0}</span>
        <div class="btn-shine"></div>
      </button>
    </div>
  </div>
  
</div>

<style>
  /* 🌟 CONTAINER PREMIUM COMPACTO */
  .filter-premium {
    background: linear-gradient(145deg, #ffffff, #f8fafc);
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 20px;
    box-shadow: 
      0 2px 12px rgba(0, 0, 0, 0.05),
      0 1px 3px rgba(0, 0, 0, 0.1);
    border: 2px solid rgba(59, 130, 246, 0.1);
    position: relative;
    overflow: hidden;
  }
  
  .filter-premium::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #3b82f6, #1d4ed8, #7c3aed, #ec4899);
    opacity: 0.8;
  }
  
  .filter-premium.dark {
    background: linear-gradient(145deg, #1f2937, #111827);
    border-color: rgba(99, 102, 241, 0.2);
    box-shadow: 
      0 2px 12px rgba(0, 0, 0, 0.2),
      0 1px 3px rgba(0, 0, 0, 0.3);
  }
  
  /* ✨ HEADER MÁGICO COMPACTO */
  .filter-magic-header {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8, #7c3aed);
    border-radius: 12px;
    padding: 12px 16px;
    margin-bottom: 16px;
    position: relative;
    overflow: hidden;
  }
  
  .filter-magic-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    to {
      left: 100%;
    }
  }
  
  .magic-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
  
  .active-count {
    display: flex;
    align-items: center;
    gap: 8px;
    color: white;
  }
  
  .count-bubble {
    background: rgba(255, 255, 255, 0.25);
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 12px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .count-text {
    font-weight: 600;
    font-size: 13px;
  }
  
  .magic-clear-btn {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    padding: 6px 12px;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 600;
    font-size: 12px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(10px);
  }
  
  .magic-clear-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
  
  .clear-glow {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
  }
  
  .magic-clear-btn:hover .clear-glow {
    left: 100%;
  }
  
  /* 🎨 SECCIONES PREMIUM COMPACTAS */
  .filter-premium-section {
    margin-bottom: 18px;
  }
  
  .filter-premium-section:last-child {
    margin-bottom: 0;
  }
  
  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    gap: 8px;
  }
  
  .section-icon {
    font-size: 16px;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    border-radius: 8px;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
  }
  
  .section-title {
    font-size: 15px;
    font-weight: 700;
    margin: 0;
    color: #1f2937;
    background: linear-gradient(135deg, #1f2937, #374151);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .filter-premium.dark .section-title {
    background: linear-gradient(135deg, #f9fafb, #e5e7eb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .section-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, #3b82f6, transparent);
    border-radius: 1px;
  }
  
  /* 🌟 BOTONES PREMIUM COMPACTOS */
  .premium-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  
  .premium-buttons.scroll-premium {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 8px;
    scrollbar-width: thin;
    scrollbar-color: rgba(59, 130, 246, 0.3) transparent;
  }
  
  .premium-buttons.scroll-premium::-webkit-scrollbar {
    height: 4px;
  }
  
  .premium-buttons.scroll-premium::-webkit-scrollbar-track {
    background: rgba(59, 130, 246, 0.1);
    border-radius: 2px;
  }
  
  .premium-buttons.scroll-premium::-webkit-scrollbar-thumb {
    background: rgba(59, 130, 246, 0.3);
    border-radius: 2px;
  }
  
  .premium-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    border: 2px solid #e5e7eb;
    border-radius: 10px;
    background: linear-gradient(145deg, #ffffff, #f8fafc);
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    min-height: 36px;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }
  
  .filter-premium.dark .premium-btn.inactive {
    background: linear-gradient(145deg, #374151, #1f2937);
    border-color: #4b5563;
    color: #d1d5db;
  }
  
  .premium-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-color: #3b82f6;
  }
  
  .premium-btn.pressed {
    transform: scale(0.95);
  }
  
  /* 🎨 ESTADOS ACTIVOS CON GRADIENTES ÚNICOS */
  .premium-btn.active {
    color: white;
    border-color: transparent;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  .premium-btn.active.neutral { background: linear-gradient(135deg, #6b7280, #4b5563); }
  .premium-btn.active.primary { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
  .premium-btn.active.secondary { background: linear-gradient(135deg, #6366f1, #4f46e5); }
  .premium-btn.active.success { background: linear-gradient(135deg, #10b981, #059669); }
  .premium-btn.active.warning { background: linear-gradient(135deg, #f59e0b, #d97706); }
  .premium-btn.active.danger { background: linear-gradient(135deg, #ef4444, #dc2626); }
  .premium-btn.active.processing { background: linear-gradient(135deg, #06b6d4, #0891b2); }
  .premium-btn.active.accent { background: linear-gradient(135deg, #f59e0b, #d97706); }
  .premium-btn.active.tertiary { background: linear-gradient(135deg, #ec4899, #db2777); }
  
  /* ✨ ELEMENTOS DE BOTÓN COMPACTOS */
  .btn-icon {
    font-size: 14px;
  }
  
  .btn-label {
    font-weight: 600;
  }
  
  .btn-badge {
    background: rgba(255, 255, 255, 0.25);
    border-radius: 8px;
    padding: 2px 6px;
    font-size: 11px;
    font-weight: 700;
    min-width: 18px;
    text-align: center;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .premium-btn.inactive .btn-badge {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
  }
  
  .btn-shine {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
  }
  
  .premium-btn:hover .btn-shine {
    left: 100%;
  }
  
  /* 📱 RESPONSIVE MÁS COMPACTO */
  @media (max-width: 480px) {
    .filter-premium {
      padding: 12px;
      margin-bottom: 16px;
    }
    
    .premium-btn {
      padding: 6px 10px;
      font-size: 12px;
      min-height: 32px;
      gap: 4px;
    }
    
    .section-title {
      font-size: 14px;
    }
    
    .section-icon {
      width: 24px;
      height: 24px;
      font-size: 14px;
    }
    
    .magic-clear-btn {
      padding: 4px 8px;
      font-size: 11px;
    }
    
    .btn-icon {
      font-size: 12px;
    }
    
    .btn-badge {
      padding: 1px 4px;
      font-size: 10px;
      min-width: 16px;
    }
  }
</style>