document.addEventListener("DOMContentLoaded", function() {
    // Adiciona a classe 'show-loader' para exibir o loader inicialmente
    document.getElementById('box-load').classList.add('show-loader');

    // Espera 5 segundos (5000 milissegundos)
    setTimeout(function() {
        // Remove a classe 'show-loader' para ocultar o loader após 5 segundos
        document.getElementById('box-load').classList.remove('show-loader');

        // Adiciona a classe 'content-loaded' para indicar que o conteúdo foi carregado
        document.body.classList.add('content-loaded');

        // Rola para o topo da página
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 5000);
});