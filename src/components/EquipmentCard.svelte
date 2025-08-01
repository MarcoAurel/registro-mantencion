<script>
  import { fly, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  
  // Props que recibe del componente padre
  export let equipo;
  export let onCambiarEstado;
  export let onEliminar;
  export let darkMode = false;
  
  // Funciones helper
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

<!-- 📱 CARD SIMPLE Y FUNCIONAL -->
<div 
  class="card-container {darkMode ? 'dark' : ''}"
  in:fly="{{ y: 50, duration: 300, delay: 100 }}"
  out:scale="{{ duration: 200, start: 0.8 }}"
>
  
  <!-- Header -->
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
  
  <!-- Problema -->
  <div class="problem-section">
    <p class="problem-text">{equipo.problema}</p>
  </div>
  
  <!-- Footer -->
  <div class="card-footer">
    <div class="tech-cost-info">
      <span class="tech-info">🔧 {equipo.tecnico}</span>
      <span class="cost-info">💰 ${equipo.costo.toLocaleString()}</span>
    </div>
    
    <!-- Botones -->
    <div class="action-buttons">
      {#if equipo.estado === 'pendiente'}
        <button 
          class="btn btn-primary"
          on:click={() => onCambiarEstado(equipo.id, 'en-reparacion')}
        >
          🔧 Iniciar
        </button>
        <button 
          class="btn btn-danger"
          on:click={() => onEliminar(equipo.id)}
        >
          🗑️
        </button>
      {/if}
      
      {#if equipo.estado === 'en-reparacion'}
        <button 
          class="btn btn-success"
          on:click={() => onCambiarEstado(equipo.id, 'completado')}
        >
          ✅ Completar
        </button>
      {/if}
    </div>
  </div>
</div>

<style>
  .card-container {
    background: white;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border: 2px solid #e5e7eb;
    transition: all 0.2s ease;
  }
  
  .card-container:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border-color: #3b82f6;
  }
  
  .card-container.dark {
    background: #1f2937;
    border-color: #374151;
    color: white;
  }
  
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
  }
  
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
  
  .action-buttons {
    display: flex;
    gap: 8px;
  }
  
  .btn {
    flex: 1;
    min-height: 44px;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
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
  
  .btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  .btn:active {
    transform: scale(0.96);
  }
  
  .card-container.dark .problem-section {
    background: rgba(59, 130, 246, 0.1);
  }
</style>