# Prueba Tecnica Analista QA

Resolución de la prueba técnica de QA Manual y Automation (`Prueba_Tecnica_QA_IGA.pdf`)
sobre [saucedemo.com](https://www.saucedemo.com), con Selenium WebDriver + TypeScript + Mocha.

## Dónde está resuelto cada ejercicio

| Ejercicio | Resuelto en |
| --- | --- |
| **1 — Diseño y documentación de pruebas** | [`docs/test-cases.md`](docs/test-cases.md) |
| **2 — Automatización con Selenium** | [`src/`](src) (page objects, flows, datos) y [`tests/`](tests) (specs y hooks) |
| **3 — Calidad de código (ESLint)** | [`eslint.config.js`](eslint.config.js) |

## Ejercicio 1 — Casos de prueba

Cada caso en `docs/test-cases.md` sigue esta plantilla:

```
### TC-<MODULO>-<NN> — <Título>

- **Módulo:**
- **Tipo:** Positivo | Negativo | Límite
- **Prioridad:** Alta | Media | Baja
- **Precondición:**

**Pasos:**
1. ...
2. ...

**Resultado esperado:**
...

**Criterio de aceptación:**
...

**Evidencia esperada:**
...
```

Cuando un caso encontró un defecto real, se agrega además una sección
**Defecto encontrado** con su severidad. Los casos automatizados en el
Ejercicio 2 tienen su caso correspondiente documentado acá, para mantener
trazabilidad entre lo documentado y lo automatizado.

## Instalación

Requisitos: Node.js LTS (v18+) y Chrome/Chromium instalado (Selenium Manager
resuelve el `chromedriver` automáticamente, no requiere configuración manual).

```bash
npm install
```

## Ejecución

```bash
npm test              # corre los tests en modo headless (por defecto)
npm run test:headed   # corre los tests con una ventana de Chrome visible (HEADLESS=false)
npm run typecheck     # chequea los tipos de TypeScript (tsc --noEmit), sin ejecutar tests
npm run lint          # corre ESLint sin aplicar fixes
npm run lint:fix      # corre ESLint aplicando los fixes automáticos posibles
```

Los tests corren contra el sitio real `https://www.saucedemo.com` — no se usa
mocking ni un servidor local.

