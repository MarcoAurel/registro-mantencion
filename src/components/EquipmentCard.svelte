<script>
  import { fly, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  
  // Props que recibe del componente padre
  export let equipo;
  export let onCambiarEstado;
  export let onEliminar;
  export let darkMode = false;
  
  // Estado local para animaciones
  let isPressed = false;
  
  // Funciones helper (las movemos aquí desde +page.svelte)
  function getIconoTipo(tipo) {
    const iconos = {
      'laptop': '💻',
      'desktop': '🖥️', 
      'printer': '🖨️',
      'tablet': '📱'
    };
    return iconos[tipo] || '⚙️';
  }
  
  function getColorPrioridad(prioridad) {
    const colores = {
      'alta': 'text-red-600 bg-red-100',
      'media': 'text-yellow-600 bg-yellow-100', 
      'baja': 'text-green-600 bg-green-100'
    };
    return colores[prioridad] || 'text-gray-600 bg-gray-100';
  }
</script>

<!-- 📱 CARD MOBILE-FIRST -->
<div 
  class="equipment-card {darkMode ? 'dark' : ''}"
  class:pressed={isPressed}
  in:fly="{{ y: 50, duration: 300, delay: 100 }}"
  out:scale="{{ duration: 200, start: 0.8 }}"
  on:touchstart={() => isPressed = true}
  on:touchend={() => isPressed = false}
  on:mousedown={() => isPressed = true}
  on:mouseup={() => isPressed = false}
  on:mouseleave={() => isPressed = false}
>
  
  <!-- 📱 HEADER MOBILE -->
  <div class="card-header">
    <div class="equipment-info">
      <div class="equipment-icon">
        {getIconoTipo(equipo.tipo)}
      </div>
      <div class="equipment-details">
        <h3 class="equipment-title">
          {equipo.marca} {equipo.modelo}
        </h3>
        <p class="client-name">👤 {equipo.cliente}</p>
      </div>
    </div>
    
    <div class="priority-badge {getColorPrioridad(equipo.prioridad)}">
      {equipo.prioridad.toUpperCase()}
    </div>
  </div>
  
  <!-- 📱 PROBLEMA SECTION -->
  <div class="problem-section">
    <p class="problem-text">{equipo.problema}</p>
  </div>
  
  <!-- 📱 FOOTER MOBILE -->
  <div class="card-footer">
    <div class="tech-cost-info">
      <span class="tech-info">🔧 {equipo.tecnico}</span>
      <span class="cost-info">💰 ${equipo.costo.toLocaleString()}</span>
    </div>
    
    <!-- 📱 BOTONES TOUCH-FRIENDLY -->
    <div class="action-buttons">
      {#if equipo.estado === 'pendiente'}
        <button 
          class="btn-primary"
          on:click={() => onCambiarEstado(equipo.id, 'en-reparacion')}
        >
          🔧 Iniciar
        </button>
        <button 
          class="btn-danger"
          on:click={() => onEliminar(equipo.id)}
        >
          🗑️
        </button>
      {/if}
      
      {#if equipo.estado === 'en-reparacion'}
        <button 
          class="btn-success"
          on:click={() => onCambiarEstado(equipo.id, 'completado')}
        >
          ✅ Completar
        </button>
      {/if}
    </div>
  </div>
</div>

<style>
  /* 📱 MOBILE-FIRST CSS */
  .equipment-card {
    background: white;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border: 2px solid transparent;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }
  
  .equipment-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border-color: #3b82f6;
  }
  
  .equipment-card.pressed {
    transform: scale(0.98);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .equipment-card.dark {
    background: #1f2937;
    border-color: #374151;
    color: white;
  }
  
  /* 📱 HEADER MOBILE */
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
  }
  
  .equipment-info {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
  }
  
  .equipment-icon {
    font-size: 32px;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    border-radius: 12px;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }
  
  .equipment-details {
    flex: 1;
  }
  
  .equipment-title {
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 4px 0;
    line-height: 1.2;
  }
  
  .client-name {
    font-size: 14px;
    opacity: 0.7;
    margin: 0;
  }
  
  .priority-badge {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  /* 📱 PROBLEMA SECTION */
  .problem-section {
    background: rgba(59, 130, 246, 0.05);
    border-radius: 12px;
    padding: 12px;
    margin-bottom: 16px;
  }
  
  .problem-text {
    margin: 0;
    font-size: 14px;
    line-height: 1.4;
  }
  
  /* 📱 FOOTER MOBILE */
  .card-footer {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .tech-cost-info {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    opacity: 0.8;
  }
  
  /* 📱 BOTONES TOUCH-FRIENDLY */
  .action-buttons {
    display: flex;
    gap: 8px;
  }
  
  .action-buttons button {
    flex: 1;
    min-height: 44px; /* 📱 Minimum touch target */
    border: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
  }
  
  .btn-primary {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
  }
  
  .btn-success {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
  }
  
  .btn-danger {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;
    min-width: 44px;
  }
  
  .action-buttons button:active {
    transform: scale(0.96);
  }
  
  .action-buttons button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  /* 📱 DARK MODE */
  .equipment-card.dark .problem-section {
    background: rgba(59, 130, 246, 0.1);
  }
  
  .equipment-card.dark .equipment-title {
    color: #f9fafb;
  }
  
  .equipment-card.dark .client-name {
    color: #d1d5db;
  }
</style>