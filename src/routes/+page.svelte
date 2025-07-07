<script>
	// 🎨 Importaciones de transiciones (NUEVAS)
	import { tweened } from 'svelte/motion';
	import { fade, fly, scale, slide } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	// 📦 Importaciones de Supabase
	import { supabase } from '$lib/supabase.js';
	// 📦 Importación de componentes
	import EquipmentCard from '../components/EquipmentCard.svelte';
	import MetricsPanel from '../components/MetricsPanel.svelte';
	import FilterBar from '../components/FilterBar.svelte';
	import Header from '../components/Header.svelte';

		// 🎯 Estado de la aplicación
	let titulo = '🔧 Sistema de Mantenimiento IT';

	// 📊 Datos de equipos - AHORA DESDE SUPABASE
	let equipos = [];
	let cargando = true;

	// 🔄 Cargar equipos desde Supabase
	onMount(async () => {
		await cargarEquipos();
	});

	async function cargarEquipos() {
		cargando = true;

		const { data, error } = await supabase
			.from('equipos')
			.select('*')
			.order('id', { ascending: true });

		if (error) {
			console.error('Error cargando equipos:', error);
		} else {
			equipos = data;
		}
		cargando = false;
	}


  // ✨ NUEVOS: Contadores para FilterBar
  $: contadores = {
    // Estados
    pendiente: equipos.filter(e => e.estado === 'pendiente').length,
    enReparacion: equipos.filter(e => e.estado === 'en-reparacion').length,
    completado: equipos.filter(e => e.estado === 'completado').length,
    
    // Prioridades
    alta: equipos.filter(e => e.prioridad === 'alta').length,
    media: equipos.filter(e => e.prioridad === 'media').length,
    baja: equipos.filter(e => e.prioridad === 'baja').length,
    
    // Tipos
    laptop: equipos.filter(e => e.tipo === 'laptop').length,
    desktop: equipos.filter(e => e.tipo === 'desktop').length,
    printer: equipos.filter(e => e.tipo === 'printer').length,
    tablet: equipos.filter(e => e.tipo === 'tablet').length
  };

	// 🔍 Estado de búsqueda
	let busqueda = '';

	// 🎯 Nuevos estados para filtros múltiples
	let filtroEstado = 'todos'; // 'todos', 'pendiente', 'en-reparacion', 'completado'
	let filtroPrioridad = 'todas'; // 'todas', 'alta', 'media', 'baja'
	let filtroTipo = 'todos'; // 'todos', 'laptop', 'desktop', 'printer', 'tablet'
	let darkMode = false; // Estado del modo oscuro

	// 🟢 Matrix ÉPICO - Versión final
	let canvas;

	onMount(() => {
		console.log('🟢 Iniciando Matrix ÉPICO...');

		canvas = document.createElement('canvas');
		canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    pointer-events: none;
  `;

		document.body.appendChild(canvas);

		const ctx = canvas.getContext('2d');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		// Caracteres Matrix reales
		const katakana =
			'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
		const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		const nums = '0123456789';
		const alphabet = katakana + latin + nums;

		const fontSize = 15;
		const columns = canvas.width / fontSize;
		const drops = [];

		// Inicializar drops
		for (let x = 0; x < columns; x++) {
			drops[x] = 1;
		}

		function drawMatrix() {
			// Fondo negro semi-transparente para efecto trail
			ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// Color verde Matrix
			ctx.fillStyle = '#0F0';
			ctx.font = fontSize + 'px monospace';

			// Dibujar caracteres
			for (let i = 0; i < drops.length; i++) {
				// Carácter aleatorio
				const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));

				// Dibujar el carácter
				ctx.fillText(text, i * fontSize, drops[i] * fontSize);

				// Resetear drop aleatoriamente
				if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
					drops[i] = 0;
				}

				// Incrementar Y position
				drops[i]++;
			}
		}

		// Guardar función para control
		window.matrixAnimation = null;

		window.startMatrixLoop = () => {
			if (!window.matrixAnimation) {
				// Fondo inicial negro
				ctx.fillStyle = '#000';
				ctx.fillRect(0, 0, canvas.width, canvas.height);

				// Iniciar loop de animación
				function loop() {
					drawMatrix();
					window.matrixAnimation = requestAnimationFrame(loop);
				}
				loop();
			}
		};

		window.stopMatrixLoop = () => {
			if (window.matrixAnimation) {
				cancelAnimationFrame(window.matrixAnimation);
				window.matrixAnimation = null;
			}
		};

		console.log('✅ Matrix ÉPICO configurado');
	});

	// Control de Matrix con darkMode
	$: if (canvas && typeof window !== 'undefined') {
		if (darkMode) {
			canvas.style.opacity = '0.8';
			if (window.startMatrixLoop) window.startMatrixLoop();
			console.log('🟢 Matrix ACTIVADO');
		} else {
			canvas.style.opacity = '0';
			if (window.stopMatrixLoop) window.stopMatrixLoop();
			console.log('🔴 Matrix DESACTIVADO');
		}
	}

	// 🔄 Variables calculadas automáticamente
	$: totalEquipos = equipos.length;
	$: equiposEnReparacion = equipos.filter((e) => e.estado === 'en-reparacion').length;
	$: equiposFuncionando = equipos.filter((e) => e.estado === 'completado').length;
	$: equiposPendientes = equipos.filter((e) => e.estado === 'pendiente').length;

	
	

	// 🔍 Filtro de búsqueda automático
	$: equiposFiltrados = equipos.filter((equipo) => {
		// 🕵️‍♂️ Filtrado por búsqueda
		const pasaBusqueda =
			busqueda === '' ||
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

	
	// 🔄 Nueva función para cambiar estado en Supabase
	async function cambiarEstado(equipoId, nuevoEstado) {
		// 📤 Actualizar en Supabase
		const { data, error } = await supabase
			.from('equipos')
			.update({ estado: nuevoEstado })
			.eq('id', equipoId)
			.select();

		if (error) {
			console.error('Error actualizando estado:', error);
			return;
		}

		// 🔄 Recargar equipos para reflejar el cambio
		await cargarEquipos();
	}

	// 🗑️ Función para eliminar equipo
	async function eliminarEquipo(equipoId) {
		// 🤔 Confirmar eliminación
		if (!confirm('¿Estás seguro de eliminar este equipo? Esta acción no se puede deshacer.')) {
			return;
		}

		// 📤 Eliminar de Supabase
		const { error } = await supabase.from('equipos').delete().eq('id', equipoId);

		if (error) {
			console.error('Error eliminando equipo:', error);
			return;
		}

		// 🔄 Recargar equipos
		await cargarEquipos();
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

	// 🔄 Nueva función para agregar equipo a Supabase
	async function agregarEquipo() {
		// 🎯 Crear objeto con datos del formulario
		const nuevoEquipoData = {
			tipo: nuevoEquipo.tipo,
			marca: nuevoEquipo.marca,
			modelo: nuevoEquipo.modelo,
			serie: nuevoEquipo.serie,
			cliente: nuevoEquipo.cliente,
			problema: nuevoEquipo.problema,
			estado: nuevoEquipo.estado,
			prioridad: nuevoEquipo.prioridad,
			tecnico: nuevoEquipo.tecnico,
			costo: parseInt(nuevoEquipo.costo) || 0
		};

		// 📤 Insertar en Supabase
		const { data, error } = await supabase.from('equipos').insert([nuevoEquipoData]).select();

		if (error) {
			console.error('Error agregando equipo:', error);
			return;
		}

		// 🔄 Recargar equipos para mostrar el nuevo
		await cargarEquipos();

		// 🧹 Limpiar formulario y cerrar modal
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

  // ✨ NUEVOS: Event handlers para FilterBar
  function handleCambioEstado(event) {
    filtroEstado = event.detail;
  }
  
  function handleCambioPrioridad(event) {
    filtroPrioridad = event.detail;
  }
  
  function handleCambioTipo(event) {
    filtroTipo = event.detail;
  }
  
  function handleLimpiarFiltros() {
    limpiarFiltros();
  }

  function handleToggleDarkMode() {
    toggleDarkMode();
  }
  
  function handleAbrirFormulario() {
    mostrarFormulario = true;
  }

</script>

<main
	class="min-h-screen p-6 transition-colors duration-300 {darkMode
		? 'dark-bg bg-gray-900'
		: 'bg-gray-50'} relative"
>
	<!-- ✨ NUEVO: Componente Header mobile-first -->
		<Header 
		{titulo}
		{darkMode}
		{mostrarFormulario}
		on:toggleDarkMode={handleToggleDarkMode}
		on:abrirFormulario={handleAbrirFormulario}
		/>

		<!-- Métricas automáticas -->
		<MetricsPanel 
  			{totalEquipos}
  				equiposPendientes={equiposPendientes}
  				equiposEnReparacion={equiposEnReparacion}
  				equiposFuncionando={equiposFuncionando}
  				{darkMode}
		/>

		<!-- Barra de búsqueda -->
		<div class="mb-6">
			<input
				type="text"
				bind:value={busqueda}
				placeholder="🔍 Buscar por cliente, marca o problema..."
				class="w-full rounded-lg border px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500
        {darkMode
					? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400'
					: 'border-gray-300 bg-white text-gray-900'}"
			/>
		</div>

		

		<!-- ✨ NUEVO: Componente FilterBar mobile-first -->
<FilterBar 
  bind:filtroEstado
  bind:filtroPrioridad  
  bind:filtroTipo
  {contadores}
  {darkMode}
  on:cambioEstado={handleCambioEstado}
  on:cambioPrioridad={handleCambioPrioridad}
  on:cambioTipo={handleCambioTipo}
  on:limpiarFiltros={handleLimpiarFiltros}
/>
			<!-- 🎭 Modal para nuevo equipo -->
			{#if mostrarFormulario}
				<div
					class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black"
					in:fade={{ duration: 200 }}
					out:fade={{ duration: 150 }}
				>
					<div
						class="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
						in:scale={{ duration: 300, start: 0.8, easing: quintOut }}
						out:scale={{ duration: 200, start: 0.8 }}
					>
						<!-- Header del modal -->
						<div class="mb-6 flex items-center justify-between">
							<h2 class="text-xl font-bold text-gray-900">➕ Nuevo Equipo</h2>
							<button on:click={cancelarFormulario} class="text-gray-400 hover:text-gray-600">
								❌
							</button>
						</div>

						<!-- Formulario -->
						<form on:submit|preventDefault={agregarEquipo} class="space-y-4">
							<!-- Tipo de equipo -->
							<div>
								<label class="mb-1 block text-sm font-medium text-gray-700"> Tipo de Equipo </label>
								<select
									bind:value={nuevoEquipo.tipo}
									class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
								>
									<option value="laptop">💻 Laptop</option>
									<option value="desktop">🖥️ Desktop</option>
									<option value="printer">🖨️ Impresora</option>
									<option value="tablet">📱 Tablet</option>
								</select>
							</div>

							<!-- Marca -->
							<div>
								<label class="mb-1 block text-sm font-medium text-gray-700"> Marca </label>
								<input
									type="text"
									bind:value={nuevoEquipo.marca}
									placeholder="HP, Dell, Canon..."
									class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
									required
								/>
							</div>

							<!-- Modelo -->
							<div>
								<label class="mb-1 block text-sm font-medium text-gray-700"> Modelo </label>
								<input
									type="text"
									bind:value={nuevoEquipo.modelo}
									placeholder="EliteBook 840, OptiPlex 7080..."
									class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
									required
								/>
							</div>

							<!-- Cliente -->
							<div>
								<label class="mb-1 block text-sm font-medium text-gray-700"> Cliente </label>
								<input
									type="text"
									bind:value={nuevoEquipo.cliente}
									placeholder="Nombre del cliente..."
									class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
									required
								/>
							</div>

							<!-- Problema -->
							<div>
								<label class="mb-1 block text-sm font-medium text-gray-700"> Problema </label>
								<textarea
									bind:value={nuevoEquipo.problema}
									placeholder="Describe el problema..."
									rows="3"
									class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
									required
								></textarea>
							</div>

							<!-- Técnico y Costo en una fila -->
							<div class="grid grid-cols-2 gap-3">
								<div>
									<label class="mb-1 block text-sm font-medium text-gray-700"> Técnico </label>
									<input
										type="text"
										bind:value={nuevoEquipo.tecnico}
										placeholder="Carlos M."
										class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
										required
									/>
								</div>
								<div>
									<label class="mb-1 block text-sm font-medium text-gray-700"> Costo ($) </label>
									<input
										type="number"
										bind:value={nuevoEquipo.costo}
										placeholder="150000"
										class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
									/>
								</div>
							</div>

							<!-- Prioridad -->
							<div>
								<label class="mb-1 block text-sm font-medium text-gray-700"> Prioridad </label>
								<select
									bind:value={nuevoEquipo.prioridad}
									class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
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
									class="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
								>
									✅ Crear Equipo
								</button>
								<button
									type="button"
									on:click={cancelarFormulario}
									class="flex-1 rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-800 transition-colors hover:bg-gray-300"
								>
									❌ Cancelar
								</button>
							</div>
						</form>
					</div>
				</div>
			{/if}
		
	
</main>



<style>
	/* CSS mínimo para que funcione */
	main {
		position: relative;
	}

	main > * {
		position: relative;
		z-index: 1;
	}
</style>
