<script>
  import { tweened } from 'svelte/motion';
  import { quintOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  
  // Props del componente padre
  export let totalEquipos = 0;
  export let equiposPendientes = 0; 
  export let equiposEnReparacion = 0;
  export let equiposFuncionando = 0;
  export let darkMode = false;
  
  // Stores animados para las métricas
  const totalAnimado = tweened(0, { duration: 600, easing: quintOut });
  const pendientesAnimado = tweened(0, { duration: 600, easing: quintOut });
  const enReparacionAnimado = tweened(0, { duration: 600, easing: quintOut });
  const completadosAnimado = tweened(0, { duration: 600, easing: quintOut });
  
  // Actualizar valores animados cuando cambien las props
  $: totalAnimado.set(totalEquipos);
  $: pendientesAnimado.set(equiposPendientes);
  $: enReparacionAnimado.set(equiposEnReparacion);
  $: completadosAnimado.set(equiposFuncionando);
  
  // Calcular porcentajes para progreso visual
  $: porcentajePendientes = totalEquipos > 0 ? (equiposPendientes / totalEquipos) * 100 : 0;
  $: porcentajeEnReparacion = totalEquipos > 0 ? (equiposEnReparacion / totalEquipos) * 100 : 0;
  $: porcentajeCompletados = totalEquipos > 0 ? (equiposFuncionando / totalEquipos) * 100 : 0;
</script>

<!-- 📱 METRICS PANEL MOBILE-FIRST -->
<div class="metrics-container {darkMode ? 'dark' : ''}">
  
  <!-- 📊 Total Equipos - Card Principal -->
  <div class="metric-card primary">
    <div class="metric-header">
      <div class="metric-icon">📊</div>
      <div class="metric-info">
        <div class="metric-value">{Math.round($totalAnimado)}</div>
        <div class="metric-label">Total Equipos</div>
      </div>
    </div>
    <div class="metric-progress">
      <div class="progress-bar total"></div>
    </div>
  </div>
  
  <!-- ⏳ Equipos Pendientes -->
  <div class="metric-card warning">
    <div class="metric-header">
      <div class="metric-icon">⏳</div>
      <div class="metric-info">
        <div class="metric-value">{Math.round($pendientesAnimado)}</div>
        <div class="metric-label">Pendientes</div>
      </div>
    </div>
    <div class="metric-progress">
      <div 
        class="progress-bar pending" 
        style="width: {porcentajePendientes}%"
      ></div>
    </div>
    <div class="metric-percentage">{porcentajePendientes.toFixed(0)}%</div>
  </div>
  
  <!-- 🔧 En Reparación -->
  <div class="metric-card processing">
    <div class="metric-header">
      <div class="metric-icon">🔧</div>
      <div class="metric-info">
        <div class="metric-value">{Math.round($enReparacionAnimado)}</div>
        <div class="metric-label">En Reparación</div>
      </div>
    </div>
    <div class="metric-progress">
      <div 
        class="progress-bar in-repair" 
        style="width: {porcentajeEnReparacion}%"
      ></div>
    </div>
    <div class="metric-percentage">{porcentajeEnReparacion.toFixed(0)}%</div>
  </div>
  
  <!-- ✅ Completados -->
  <div class="metric-card success">
    <div class="metric-header">
      <div class="metric-icon">✅</div>
      <div class="metric-info">
        <div class="metric-value">{Math.round($completadosAnimado)}</div>
        <div class="metric-label">Completados</div>
      </div>
    </div>
    <div class="metric-progress">
      <div 
        class="progress-bar completed" 
        style="width: {porcentajeCompletados}%"
      ></div>
    </div>
    <div class="metric-percentage">{porcentajeCompletados.toFixed(0)}%</div>
  </div>
  
</div>

<style>
  /* 📱 MOBILE-FIRST METRICS */
  .metrics-container {
    display: grid;
    grid-template-columns: 1fr 1fr; /* 📱 2x2 en mobile */
    gap: 16px;
    margin-bottom: 24px;
  }
  
  /* 💻 Desktop: 4 columns */
  @media (min-width: 768px) {
    .metrics-container {
      grid-template-columns: repeat(4, 1fr); /* 💻 4x1 en desktop */
    }
  }
  
  /* 📊 Metric Cards */
  .metric-card {
    background: white;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border: 2px solid transparent;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }
  
  .metric-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  .metric-card:active {
    transform: translateY(-2px);
  }
  
  /* 🌟 Card Variants */
  .metric-card.primary {
    border-left: 4px solid #3b82f6;
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    color: white;
  }
  
  .metric-card.warning {
    border-left: 4px solid #f59e0b;
  }
  
  .metric-card.processing {
    border-left: 4px solid #06b6d4;
  }
  
  .metric-card.success {
    border-left: 4px solid #10b981;
  }
  
  /* 📱 Metric Header */
  .metric-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }
  
  .metric-icon {
    font-size: 28px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);
  }
  
  .metric-card:not(.primary) .metric-icon {
    background: rgba(59, 130, 246, 0.1);
  }
  
  .metric-info {
    flex: 1;
  }
  
  .metric-value {
    font-size: 32px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 4px;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .metric-card.primary .metric-value {
    color: white;
    background: none;
    -webkit-text-fill-color: white;
  }
  
  .metric-label {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    opacity: 0.8;
  }
  
  /* 📊 Progress Bars */
  .metric-progress {
    height: 4px;
    background: rgba(59, 130, 246, 0.1);
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 8px;
  }
  
  .progress-bar {
    height: 100%;
    border-radius: 2px;
    transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .progress-bar.total {
    background: linear-gradient(90deg, #3b82f6, #1d4ed8);
    width: 100%;
  }
  
  .progress-bar.pending {
    background: linear-gradient(90deg, #f59e0b, #d97706);
  }
  
  .progress-bar.in-repair {
    background: linear-gradient(90deg, #06b6d4, #0891b2);
  }
  
  .progress-bar.completed {
    background: linear-gradient(90deg, #10b981, #059669);
  }
  
  /* 📊 Percentage */
  .metric-percentage {
    font-size: 10px;
    font-weight: 600;
    color: #6b7280;
    text-align: right;
  }
  
  /* 🌙 Dark Mode */
  .metrics-container.dark .metric-card {
    background: #1f2937;
    border-color: #374151;
    color: white;
  }
  
  .metrics-container.dark .metric-card:not(.primary) {
    background: #1f2937;
  }
  
  .metrics-container.dark .metric-label {
    color: #d1d5db;
  }
  
  .metrics-container.dark .metric-percentage {
    color: #9ca3af;
  }
  
  .metrics-container.dark .metric-progress {
    background: rgba(75, 85, 99, 0.3);
  }
  
  /* 📱 Responsive adjustments */
  @media (max-width: 480px) {
    .metric-card {
      padding: 16px;
    }
    
    .metric-value {
      font-size: 24px;
    }
    
    .metric-icon {
      font-size: 20px;
      width: 40px;
      height: 40px;
    }
  }
</style>