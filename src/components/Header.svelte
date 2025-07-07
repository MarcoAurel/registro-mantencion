<script>
  import { scale, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  
  // Props del componente padre
  export let titulo = "🔧 Sistema de Mantenimiento IT";
  export let darkMode = false;
  export let mostrarFormulario = false;
  
  // Eventos hacia el padre
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  
  function toggleDarkMode() {
    dispatch('toggleDarkMode');
  }
  
  function abrirFormulario() {
    dispatch('abrirFormulario');
  }
  
  // Estado para animación del botón dark mode
  let darkModePressed = false;
</script>

<!-- 📱 HEADER MOBILE-FIRST -->
<header class="header-container {darkMode ? 'dark' : ''}">
  
  <!-- 📱 Top Section -->
  <div class="header-top">
    
    <!-- 🏠 Brand Section -->
    <div class="brand-section">
      <h1 class="app-title">{titulo}</h1>
      <p class="app-subtitle">Dashboard principal de gestión de equipos</p>
    </div>
    
    <!-- 🎮 Controls Section -->
    <div class="controls-section">
      
      <!-- 🌙 Dark Mode Toggle -->
      <button 
        class="dark-mode-btn {darkMode ? 'active' : ''}"
        class:pressed={darkModePressed}
        on:click={toggleDarkMode}
        on:mousedown={() => darkModePressed = true}
        on:mouseup={() => darkModePressed = false}
        on:mouseleave={() => darkModePressed = false}
        on:touchstart={() => darkModePressed = true}
        on:touchend={() => darkModePressed = false}
      >
        <div class="mode-icon-container">
          <span class="mode-icon sun {darkMode ? 'hidden' : 'visible'}">☀️</span>
          <span class="mode-icon moon {darkMode ? 'visible' : 'hidden'}">🌙</span>
        </div>
        <span class="mode-text">{darkMode ? 'Light' : 'Dark'}</span>
      </button>
      
    </div>
    
  </div>
  
  <!-- 📱 Action Section -->
  <div class="header-actions">
    
    <!-- ➕ New Equipment Button (Mobile optimized) -->
    <button 
      class="new-equipment-btn"
      on:click={abrirFormulario}
      in:scale="{{ duration: 200, delay: 300 }}"
    >
      <span class="btn-icon">➕</span>
      <span class="btn-text">Nuevo Equipo</span>
      <div class="btn-glow"></div>
    </button>
    
  </div>
  
</header>

<!-- 🌊 FAB para mobile (posición fija) -->
<div class="fab-container {darkMode ? 'dark' : ''}">
  <button 
    class="fab"
    on:click={abrirFormulario}
    in:scale="{{ duration: 300, delay: 500, easing: quintOut }}"
  >
    <span class="fab-icon">➕</span>
    <div class="fab-ripple"></div>
  </button>
</div>

<style>
  /* 📱 HEADER CONTAINER */
  .header-container {
    background: white;
    border-radius: 0 0 24px 24px;
    padding: 20px;
    margin-bottom: 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    border: 2px solid #f1f5f9;
    position: relative;
    overflow: hidden;
  }
  
  .header-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #1d4ed8, #7c3aed);
    opacity: 0.8;
  }
  
  .header-container.dark {
    background: #1f2937;
    border-color: #374151;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }
  
  /* 📱 HEADER TOP */
  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
    gap: 16px;
  }
  
  /* 🏠 Brand */
  .brand-section {
    flex: 1;
  }
  
  .app-title {
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 4px 0;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8, #7c3aed);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.2;
  }
  
  .app-subtitle {
    font-size: 14px;
    color: #6b7280;
    margin: 0;
    font-weight: 500;
  }
  
  .header-container.dark .app-subtitle {
    color: #9ca3af;
  }
  
  /* 🎮 Controls */
  .controls-section {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
  }
  
  /* 🌙 Dark Mode Button */
  .dark-mode-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    border: 2px solid #e5e7eb;
    border-radius: 50px;
    background: white;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    min-height: 44px;
  }
  
  .dark-mode-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  .dark-mode-btn.pressed {
    transform: scale(0.96);
  }
  
  .dark-mode-btn.active {
    background: #1f2937;
    border-color: #374151;
    color: white;
    box-shadow: 0 4px 15px rgba(31, 41, 55, 0.3);
  }
  
  .mode-icon-container {
    position: relative;
    width: 20px;
    height: 20px;
  }
  
  .mode-icon {
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 16px;
  }
  
  .mode-icon.visible {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }
  
  .mode-icon.hidden {
    opacity: 0;
    transform: rotate(180deg) scale(0.5);
  }
  
  /* 📱 HEADER ACTIONS */
  .header-actions {
    display: flex;
    justify-content: center;
  }
  
  /* ➕ New Equipment Button */
  .new-equipment-btn {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 32px;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    border: none;
    border-radius: 50px;
    color: white;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
    min-height: 52px;
  }
  
  .new-equipment-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.5);
  }
  
  .new-equipment-btn:active {
    transform: translateY(-1px);
  }
  
  .btn-icon {
    font-size: 18px;
    font-weight: bold;
  }
  
  .btn-glow {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
  }
  
  .new-equipment-btn:hover .btn-glow {
    left: 100%;
  }
  
  /* 🌊 FAB (Floating Action Button) */
  .fab-container {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 100;
  }
  
  .fab {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    border: none;
    color: white;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }
  
  .fab:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.6);
  }
  
  .fab:active {
    transform: scale(1.05);
  }
  
  .fab-ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple 0.6s linear;
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  /* 📱 Responsive */
  @media (min-width: 768px) {
    .fab-container {
      display: none; /* Solo en mobile */
    }
    
    .header-container {
      border-radius: 16px;
      margin-bottom: 32px;
    }
    
    .header-top {
      margin-bottom: 16px;
    }
  }
  
  @media (max-width: 480px) {
    .app-title {
      font-size: 20px;
    }
    
    .app-subtitle {
      font-size: 13px;
    }
    
    .new-equipment-btn {
      padding: 14px 24px;
      font-size: 15px;
    }
    
    .dark-mode-btn {
      padding: 10px 12px;
      font-size: 13px;
    }
    
    .mode-text {
      display: none; /* Solo ícono en mobile muy pequeño */
    }
  }
</style>