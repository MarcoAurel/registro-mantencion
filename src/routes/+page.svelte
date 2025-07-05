<script>
  // 🎯 Estado de la aplicación
  let titulo = "🔧 Sistema de Mantenimiento IT";
  
  // 📊 Datos de equipos
  let equipos = [
    {
      id: 1,
      tipo: 'laptop',
      marca: 'HP',
      modelo: 'EliteBook 840',
      serie: 'HP001ABC',
      cliente: 'Juan Pérez',
      problema: 'No enciende - Posible problema de fuente',
      estado: 'en-reparacion',
      prioridad: 'alta',
      tecnico: 'Carlos M.',
      costo: 150000
    },
    {
      id: 2,
      tipo: 'desktop',
      marca: 'Dell',
      modelo: 'OptiPlex 7080',
      serie: 'DELL002XYZ',
      cliente: 'María González',
      problema: 'Pantalla azul constante - Error de RAM',
      estado: 'pendiente',
      prioridad: 'media',
      tecnico: 'Ana R.',
      costo: 80000
    },
    {
      id: 3,
      tipo: 'printer',
      marca: 'Canon',
      modelo: 'PIXMA G6020',
      serie: 'CANON003ZZZ',
      cliente: 'Oficina Legal Soto',
      problema: 'Atasco de papel recurrente',
      estado: 'completado',
      prioridad: 'baja',
      tecnico: 'Luis T.',
      costo: 45000
    },
    {
      id: 4,
      tipo: 'laptop',
      marca: 'Lenovo',
      modelo: 'ThinkPad X1',
      serie: 'LENOVO004AAA',
      cliente: 'Roberto Silva',
      problema: 'Teclado no responde - Líquido derramado',
      estado: 'en-reparacion',
      prioridad: 'alta',
      tecnico: 'Carlos M.',
      costo: 200000
    }
  ];
  
  // 🔍 Estado de búsqueda
    let busqueda = '';
  
  // 🎯 Nuevos estados para filtros múltiples
    let filtroEstado = 'todos';        // 'todos', 'pendiente', 'en-reparacion', 'completado'
    let filtroPrioridad = 'todas';     // 'todas', 'alta', 'media', 'baja'
    let filtroTipo = 'todos';          // 'todos', 'laptop', 'desktop', 'printer', 'tablet'
    let darkMode = false; // Estado del modo oscuro

  // 🔄 Variables calculadas automáticamente
  $: totalEquipos = equipos.length;
  $: equiposEnReparacion = equipos.filter(e => e.estado === 'en-reparacion').length;
  $: equiposFuncionando = equipos.filter(e => e.estado === 'completado').length;
  $: equiposPendientes = equipos.filter(e => e.estado === 'pendiente').length;

  // 🎯 Nuevas variables inteligentes para filtros
$: filtrosActivos = [
  busqueda !== '' ? 'búsqueda' : null,
  filtroEstado !== 'todos' ? 'estado' : null,
  filtroPrioridad !== 'todas' ? 'prioridad' : null,
  filtroTipo !== 'todos' ? 'tipo' : null
].filter(Boolean); // Elimina los null

$: numeroFiltrosActivos = filtrosActivos.length;
$: hayFiltrosActivos = numeroFiltrosActivos > 0;
$: equiposMostrados = equiposFiltrados.length;
$: equiposOcultos = totalEquipos - equiposMostrados;
  
  // 🔍 Filtro de búsqueda automático
 $: equiposFiltrados = equipos.filter(equipo => {
        // 🕵️‍♂️ Filtrado por búsqueda
    const pasaBusqueda = busqueda === '' ||
        equipo.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
        equipo.marca.toLowerCase().includes(busqueda.toLowerCase()) ||
        equipo.problema.toLowerCase().includes(busqueda.toLowerCase());
    // 🗂️ Filtrado por estado, prioridad y tipo
    const pasaEstado = filtroEstado === 'todos' || equipo.estado === filtroEstado;
    const pasaPrioridad = filtroPrioridad === 'todas' || equipo.prioridad === filtroPrioridad;
    const pasaTipo = filtroTipo === 'todos' || equipo.tipo === filtroTipo;
    // ✅ Retornar true si pasa todos los filtros
    return pasaBusqueda && pasaEstado && pasaPrioridad && pasaTipo;
});


    // 🌓 Modo oscuro
    function toggleDarkMode() {
        darkMode = !darkMode;
        document.documentElement.classList.toggle('dark', darkMode);
    }
  
  // 🎨 Funciones helper
  function getIconoTipo(tipo) {
    const iconos = {
      'laptop': '💻',
      'desktop': '🖥️',
      'printer': '🖨️',
      'tablet': '📱'
    };
    return iconos[tipo] || '⚙️';
  }
  
  function getColorEstado(estado) {
    const colores = {
      'pendiente': 'border-yellow-400',
      'en-reparacion': 'border-blue-400',
      'completado': 'border-green-400'
    };
    return colores[estado] || 'border-gray-400 bg-gray-50';
  }
  
  function getColorPrioridad(prioridad) {
    const colores = {
      'alta': 'text-red-600 bg-red-100',
      'media': 'text-yellow-600 bg-yellow-100',
      'baja': 'text-green-600 bg-green-100'
    };
    return colores[prioridad] || 'text-gray-600 bg-gray-100';
  }
  
  // 🔄 Función para cambiar estado
  function cambiarEstado(equipoId, nuevoEstado) {
    equipos = equipos.map(equipo => 
      equipo.id === equipoId 
        ? { ...equipo, estado: nuevoEstado }
        : equipo
    );
  }

  // 🆕 Estado del formulario
  let mostrarFormulario = false;
  let nuevoEquipo = {
    tipo: 'laptop',
    marca: '',
    modelo: '',
    serie: '',
    cliente: '',
    problema: '',
    estado: 'pendiente',
    prioridad: 'media',
    tecnico: '',
    costo: 0
  };
  
  // 🔄 Función para agregar equipo
  function agregarEquipo() {
    // 🎯 Crear nuevo equipo con ID único
    const equipoCompleto = {
      ...nuevoEquipo,
      id: Date.now(), // ID temporal usando timestamp
      costo: parseInt(nuevoEquipo.costo) || 0
    };
    
    // ➕ Añadir al array de equipos
    equipos = [...equipos, equipoCompleto];
    
    // 🧹 Limpiar formulario
    nuevoEquipo = {
      tipo: 'laptop',
      marca: '',
      modelo: '',
      serie: '',
      cliente: '',
      problema: '',
      estado: 'pendiente',
      prioridad: 'media',
      tecnico: '',
      costo: 0
    };   
    
    // 🚪 Cerrar modal
    mostrarFormulario = false;
  }
  
  // 🚫 Función para cancelar
  function cancelarFormulario() {
    mostrarFormulario = false;
    // Opcional: resetear formulario
  }

  // 🧹 Función para limpiar todos los filtros
    function limpiarFiltros() {
        busqueda = '';
        filtroEstado = 'todos';
        filtroPrioridad = 'todas';
        filtroTipo = 'todos';
    }

</script>


<main class="min-h-screen p-6 transition-colors duration-300 {darkMode ? 'bg-gray-900' : 'bg-gray-50'}">
  <div class="max-w-6xl mx-auto">
    
    <!-- Header con botón mejorado -->
<header class="mb-8 flex justify-between items-center">
  <div>
    <h1 class="text-3xl font-bold mb-2 {darkMode ? 'text-white' : 'text-gray-900'}">
        {titulo}
    </h1>
    <p class="{darkMode ? 'text-gray-300' : 'text-gray-600'}">
        Dashboard principal de gestión de equipos
    </p>
  </div>

   <div class="flex items-center gap-3">
    <!-- 🌙 Toggle Dark Mode -->
        <button 
          on:click={toggleDarkMode}
          class="px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 {darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}"
        >
      {darkMode ? '☀️ Light' : '🌙 Dark'}
    </button>
  
  <!-- 🆕 Botón para abrir formulario -->
  <button 
    on:click={() => mostrarFormulario = true}
    class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
  >
    ➕ Nuevo Equipo
  </button>
</header>

    <!-- Métricas automáticas -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      
      <div class="rounded-lg shadow-lg p-6 border-l-4 border-blue-500 {darkMode ? 'bg-gray-800' : 'bg-white'}">
        <div class="text-3xl font-bold text-blue-600">{totalEquipos}</div>
        <div class="{darkMode ? 'text-gray-300' : 'text-gray-600'}">Total Equipos</div>
      </div>

      <div class="rounded-lg shadow-lg p-6 border-l-4 border-yellow-500 {darkMode ? 'bg-gray-800' : 'bg-white'}">
        <div class="text-3xl font-bold text-yellow-600">{equiposPendientes}</div>
        <div class="{darkMode ? 'text-gray-300' : 'text-gray-600'}">Pendientes</div>
      </div>

      <div class="rounded-lg shadow-lg p-6 border-l-4 border-orange-500 {darkMode ? 'bg-gray-800' : 'bg-white'}">
        <div class="text-3xl font-bold text-orange-600">{equiposEnReparacion}</div>
        <div class="{darkMode ? 'text-gray-300' : 'text-gray-600'}">En Reparación</div>
      </div>

      <div class="rounded-lg shadow-lg p-6 border-l-4 border-green-500 {darkMode ? 'bg-gray-800' : 'bg-white'}">
        <div class="text-3xl font-bold text-green-600">{equiposFuncionando}</div>
        <div class="{darkMode ? 'text-gray-300' : 'text-gray-600'}">Completados</div>
      </div>
      
    </div>

    <!-- Barra de búsqueda -->
    <div class="mb-6">
      <input 
        type="text" 
        bind:value={busqueda}
        placeholder="🔍 Buscar por cliente, marca o problema..."
        class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
        {darkMode ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}"
>
    </div>

    <!-- 📊 Barra de Estado Inteligente -->
    {#if hayFiltrosActivos}
    <div class="mb-4 rounded-lg p-4 {darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-blue-50 border border-blue-200'}">
        <div class="flex justify-between items-center">
        <div class="flex items-center gap-3">
          <span class="font-medium {darkMode ? 'text-gray-200' : 'text-blue-700'}">
            🔍 {numeroFiltrosActivos} filtro{numeroFiltrosActivos !== 1 ? 's' : ''} activo{numeroFiltrosActivos !== 1 ? 's' : ''}
            </span>
            <span class="text-sm {darkMode ? 'text-gray-300' : 'text-blue-600'}">
              Mostrando {equiposMostrados} de {totalEquipos} equipos
            </span>
            {#if equiposOcultos > 0}
              <span class="text-sm {darkMode ? 'text-gray-400' : 'text-blue-500'}">
                ({equiposOcultos} oculto{equiposOcultos !== 1 ? 's' : ''})
              </span>
            {/if}
        </div>
        
        <button 
            on:click={limpiarFiltros}
            class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg font-medium transition-colors flex items-center gap-1"
        >
            🧹 Limpiar Todo
        </button>
        </div>
        
        <!-- Lista de filtros activos -->
        <div class="mt-2 flex flex-wrap gap-2">
        {#each filtrosActivos as filtro}
            <span class="px-2 py-1 text-xs rounded-full font-medium {darkMode ? 'bg-gray-600 text-gray-200' : 'bg-blue-100 text-blue-800'}">
            {filtro}
            </span>
        {/each}
        </div>
    </div>
    {/if}

<!-- 🎯 NUEVA SECCIÓN: Filtros Avanzados -->
<div class="mb-6 rounded-lg shadow-lg p-4 {darkMode ? 'bg-gray-800' : 'bg-white'}">
  <h3 class="text-lg font-medium mb-4 {darkMode ? 'text-white' : 'text-gray-900'}">🔍 Filtros Avanzados</h3>
  
  <div class="space-y-4">
    
    <!-- Filtro por Estado -->
    <div>
      <label class="block text-sm font-medium mb-2 {darkMode ? 'text-gray-300' : 'text-gray-700'}">Estado:</label>
      <div class="flex flex-wrap gap-2">
        <button 
          on:click={() => filtroEstado = 'todos'}
          class="px-3 py-1 rounded-full text-sm font-medium transition-colors
                {filtroEstado === 'todos' ? 'bg-blue-600 text-white' : 
                darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
        >
          📋 Todos
        </button>
        <button 
          on:click={() => filtroEstado = 'pendiente'}
          class="px-3 py-1 rounded-full text-sm font-medium transition-colors
                 {filtroEstado === 'pendiente' ? 'bg-yellow-600 text-white' : 
                 darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
        >
          ⏳ Pendientes
        </button>
        <button 
          on:click={() => filtroEstado = 'en-reparacion'}
          class="px-3 py-1 rounded-full text-sm font-medium transition-colors
                 {filtroEstado === 'en-reparacion' ? 'bg-blue-600 text-white' : 
                 darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
        >
          🔧 En Reparación
        </button>
        <button 
          on:click={() => filtroEstado = 'completado'}
          class="px-3 py-1 rounded-full text-sm font-medium transition-colors
                 {filtroEstado === 'completado' ? 'bg-green-600 text-white' : 
                 darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
        >
          ✅ Completados
        </button>
      </div>
    </div>
    
    <!-- Filtro por Prioridad -->
    <div>
      <label class="block text-sm font-medium mb-2 {darkMode ? 'text-gray-300' : 'text-gray-700'}">Prioridad:</label>
      <div class="flex flex-wrap gap-2">
        <button 
          on:click={() => filtroPrioridad = 'todas'}
          class="px-3 py-1 rounded-full text-sm font-medium transition-colors
                 {filtroPrioridad === 'todas' ? 'bg-blue-600 text-white' : 
                 darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
        >
          🎯 Todas
        </button>
        <button 
          on:click={() => filtroPrioridad = 'alta'}
          class="px-3 py-1 rounded-full text-sm font-medium transition-colors
                 {filtroPrioridad === 'alta' ? 'bg-red-600 text-white' : 
                 darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
        >
          🔴 Alta
        </button>
        <button 
          on:click={() => filtroPrioridad = 'media'}
          class="px-3 py-1 rounded-full text-sm font-medium transition-colors
                 {filtroPrioridad === 'media' ? 'bg-yellow-600 text-white' : 
                 darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
        >
          🟡 Media
        </button>
        <button 
          on:click={() => filtroPrioridad = 'baja'}
          class="px-3 py-1 rounded-full text-sm font-medium transition-colors
                 {filtroPrioridad === 'baja' ? 'bg-green-600 text-white' : 
                 darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
        >
          🟢 Baja
        </button>
         <!-- 💻 Filtro por Tipo de Equipo -->
    <div>
      <label class="block text-sm font-medium mb-2 {darkMode ? 'text-gray-300' : 'text-gray-700'}">Tipo de Equipo:</label>
      <div class="flex flex-wrap gap-2">
        <button 
          on:click={() => filtroTipo = 'todos'}
          class="px-3 py-1 rounded-full text-sm font-medium transition-colors
                 {filtroTipo === 'todos' ? 'bg-blue-600 text-white' : 
                 darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' :'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
        >
          ⚙️ Todos
        </button>
        <button 
          on:click={() => filtroTipo = 'laptop'}
          class="px-3 py-1 rounded-full text-sm font-medium transition-colors
                 {filtroTipo === 'laptop' ? 'bg-purple-600 text-white' : 
                 darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' :'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
        >
          💻 Laptops
        </button>
        <button 
          on:click={() => filtroTipo = 'desktop'}
          class="px-3 py-1 rounded-full text-sm font-medium transition-colors
                 {filtroTipo === 'desktop' ? 'bg-indigo-600 text-white' : 
                 darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' :'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
        >
          🖥️ Desktops
        </button>
        <button 
          on:click={() => filtroTipo = 'printer'}
          class="px-3 py-1 rounded-full text-sm font-medium transition-colors
                 {filtroTipo === 'printer' ? 'bg-orange-600 text-white' : 
                 darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
        >
          🖨️ Impresoras
        </button>
        <button 
          on:click={() => filtroTipo = 'tablet'}
          class="px-3 py-1 rounded-full text-sm font-medium transition-colors
                 {filtroTipo === 'tablet' ? 'bg-pink-600 text-white' : 
                 darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' :'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
        >
          📱 Tablets
        </button>
      </div>
    </div>
  </div>
</div>

    <!-- Lista de equipos -->
    <div class="space-y-4">
      <h2 class="text-xl font-bold mb-4 {darkMode ? 'text-white' : 'text-gray-900'}">
        📋 Equipos ({equiposFiltrados.length})
      </h2>
      
      <!-- 🔄 Loop de Svelte - ¡Aquí está la magia! -->
      {#each equiposFiltrados as equipo (equipo.id)}
        <div class="rounded-lg shadow-lg p-6 border-l-4 {getColorEstado(equipo.estado)} {darkMode ? 'bg-gray-800' : 'bg-white'}">
          
          <!-- Header del equipo -->
          <div class="flex justify-between items-start mb-4">
            <div class="flex items-center gap-3">
              <span class="text-2xl">{getIconoTipo(equipo.tipo)}</span>
              <div>
                <h3 class="text-lg font-bold {darkMode ? 'text-white' : 'text-gray-900'}">
                  {equipo.marca} {equipo.modelo}
                </h3>
                <p class="{darkMode ? 'text-gray-300' : 'text-gray-600'}">Cliente: {equipo.cliente}</p>
              </div>
            </div>
            
            <span class="px-3 py-1 rounded-full text-sm font-medium {getColorPrioridad(equipo.prioridad)}">
              {equipo.prioridad.toUpperCase()}
            </span>
          </div>
          
          <!-- Problema -->
          <div class="mb-4">
            <p class="{darkMode ? 'text-gray-300' : 'text-gray-700'}">{equipo.problema}</p>
          </div>
          
          <!-- Footer con acciones -->
          <div class="flex justify-between items-center">
            <div class="text-sm {darkMode ? 'text-gray-400' : 'text-gray-600'}">
              <span>👤 {equipo.tecnico}</span>
              <span class="mx-2">•</span>
              <span>💰 ${equipo.costo.toLocaleString()}</span>
            </div>
            
            <div class="flex gap-2">
              {#if equipo.estado === 'pendiente'}
                <button 
                  on:click={() => cambiarEstado(equipo.id, 'en-reparacion')}
                  class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                >
                  🔧 Iniciar
                </button>
              {/if}
              
              {#if equipo.estado === 'en-reparacion'}
                <button 
                  on:click={() => cambiarEstado(equipo.id, 'completado')}
                  class="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                >
                  ✅ Completar
                </button>
              {/if}
            </div>
          </div>
          
        </div>
      {/each}
      
      <!-- Mensaje si no hay resultados -->
      {#if equiposFiltrados.length === 0}
        <div class="text-center py-8 {darkMode ? 'text-gray-400' : 'text-gray-500'}">
          🔍 No se encontraron equipos con "{busqueda}"
        </div>
      {/if}
    </div>

  </div>
  <!-- 🎭 Modal para nuevo equipo -->
{#if mostrarFormulario}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
      
      <!-- Header del modal -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-gray-900">➕ Nuevo Equipo</h2>
        <button 
          on:click={cancelarFormulario}
          class="text-gray-400 hover:text-gray-600"
        >
          ❌
        </button>
      </div>
      
      <!-- Formulario -->
      <form on:submit|preventDefault={agregarEquipo} class="space-y-4">
        
        <!-- Tipo de equipo -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Equipo
          </label>
          <select 
            bind:value={nuevoEquipo.tipo}
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="laptop">💻 Laptop</option>
            <option value="desktop">🖥️ Desktop</option>
            <option value="printer">🖨️ Impresora</option>
            <option value="tablet">📱 Tablet</option>
          </select>
        </div>
        
        <!-- Marca -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Marca
          </label>
          <input 
            type="text" 
            bind:value={nuevoEquipo.marca}
            placeholder="HP, Dell, Canon..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
        </div>
        
        <!-- Modelo -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Modelo
          </label>
          <input 
            type="text" 
            bind:value={nuevoEquipo.modelo}
            placeholder="EliteBook 840, OptiPlex 7080..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
        </div>
        
        <!-- Cliente -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Cliente
          </label>
          <input 
            type="text" 
            bind:value={nuevoEquipo.cliente}
            placeholder="Nombre del cliente..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
        </div>
        
        <!-- Problema -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Problema
          </label>
          <textarea 
            bind:value={nuevoEquipo.problema}
            placeholder="Describe el problema..."
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        
        <!-- Técnico y Costo en una fila -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Técnico
            </label>
            <input 
              type="text" 
              bind:value={nuevoEquipo.tecnico}
              placeholder="Carlos M."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Costo ($)
            </label>
            <input 
              type="number" 
              bind:value={nuevoEquipo.costo}
              placeholder="150000"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
          </div>
        </div>
        
        <!-- Prioridad -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Prioridad
          </label>
          <select 
            bind:value={nuevoEquipo.prioridad}
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="baja">🟢 Baja</option>
            <option value="media">🟡 Media</option>
            <option value="alta">🔴 Alta</option>
          </select>
        </div>
        
        <!-- Botones -->
        <div class="flex gap-3 pt-4">
          <button 
            type="submit"
            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            ✅ Crear Equipo
          </button>
          <button 
            type="button"
            on:click={cancelarFormulario}
            class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors"
          >
            ❌ Cancelar
          </button>
        </div>
        
      </form>
    </div>
  </div>
{/if}
</main>