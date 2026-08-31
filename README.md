# Cárdenas & Asociados — Web SEO

Sitio estático autocontenido, preparado para publicarse desde la raíz de un repositorio de GitHub Pages. No requiere compilación, dependencias ni servidor propio.

## Publicación en GitHub Pages

1. Copiar todo el contenido de esta carpeta a la raíz del repositorio.
2. En GitHub, abrir **Settings → Pages**.
3. Elegir **Deploy from a branch**, la rama principal y la carpeta **/(root)**.
4. Guardar y esperar la publicación.

El archivo `.nojekyll` evita que GitHub transforme la estructura y `CNAME` declara el dominio `www.cardenasyasociados.com.ar`. Para probar el sitio localmente hay que servir la carpeta por HTTP:

```bash
python3 -m http.server 8080
```

Abrir: http://localhost:8080/

## Estructura principal

- `index.html`: inicio.
- `servicios/`: páginas de servicios.
- `articulos/`: listado y artículos individuales.
- `assets/css/`: estilos.
- `assets/js/`: comportamiento y mediciones.
- `assets/img/site/`: portada, retrato, mapa, logo y testimonios.
- `assets/img/articles/`: imágenes WebP de los artículos.
- `assets/img/placeholders/`: reservas visuales para imágenes pendientes.
- `data/`: plan y datos estructurados de los artículos.
- `docs/`: informes, prompts y documentación de trabajo.
- `templates/`: plantilla para futuros artículos.
- `sitemap.xml` y `robots.txt`: archivos de indexación.

La versión contiene 102 artículos en URLs independientes, cada uno con su imagen WebP, hubs de Familia y Sucesiones, rutas históricas recuperadas y sitemap. Los scripts de conversiones se conservaron sin cambios.

La segunda etapa editorial está documentada en `data/wave2/`, se consolida junto con el plan original en `data/PLAN_100_ARTICULOS.json` y puede regenerarse con `scripts/build_wave2_articles.py`.
