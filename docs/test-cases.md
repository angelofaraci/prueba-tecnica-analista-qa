# Casos de prueba — SauceDemo

## TC-LOGIN-01 — Login con standard_user

- **Módulo:** Login
- **Tipo:** Positivo
- **Prioridad:** Alta
- **Precondición:** Usuario sin loguear en la página https://www.saucedemo.com

**Pasos:**
1. Rellenar el formulario de inicio de sesión de la siguiente manera:
    - Username: standard_user
    - Contraseña: secret_sauce
2. Clickear el botón "Login".

**Resultado esperado:**
El sistema inicia sesión con el rol standard_user y carga la pantalla de Products.

**Criterio de aceptación:**
Se redirige a la URL https://www.saucedemo.com/inventory.html y se visualiza el listado de productos con el título "Products".

**Evidencia esperada:**
Screenshot de la pantalla de inventario ya cargada, con el título "Products" visible.

---

## TC-LOGIN-02 — Login con locked_out_user

- **Módulo:** Login
- **Tipo:** Negativo
- **Prioridad:** Media
- **Precondición:** Usuario sin loguear en la página https://www.saucedemo.com

**Pasos:**
1. Rellenar el formulario de inicio de sesión de la siguiente manera:
    - Username: locked_out_user
    - Contraseña: secret_sauce
2. Clickear el botón "Login".

**Resultado esperado:**
El sistema no inicia sesión.

**Criterio de aceptación:**
Se muestra en pantalla el mensaje de error "Epic sadface: Sorry, this user has been locked out.".

**Evidencia esperada:**
Screenshot de la pantalla de Login con el mensaje de error visible.

---

## TC-LOGIN-03 — Login con credenciales inválidas

- **Módulo:** Login
- **Tipo:** Negativo
- **Prioridad:** Alta
- **Precondición:** Usuario sin loguear en la página https://www.saucedemo.com

**Pasos:**
1. Rellenar el formulario de inicio de sesión de la siguiente manera:
    - Username: invalid_user
    - Contraseña: wrong_password
2. Clickear el botón "Login".

**Resultado esperado:**
El sistema no inicia sesión y permanece en la pantalla de Login.

**Criterio de aceptación:**
Se muestra en pantalla el mensaje de error "Epic sadface: Username and password do not match any user in this service" y la URL no cambia a /inventory.html.

**Evidencia esperada:**
Screenshot de la pantalla de Login con el mensaje de error visible.

---

## TC-LOGIN-04 — Login con campos obligatorios vacíos

- **Módulo:** Login
- **Tipo:** Límite
- **Prioridad:** Media
- **Precondición:** Usuario sin loguear en la página https://www.saucedemo.com

**Pasos:**
1. Sin completar ningún campo, clickear "Login".
2. Completar únicamente "Username" y clickear "Login" nuevamente.

**Resultado esperado:**
El sistema no inicia sesión en ninguno de los dos intentos, y muestra en cada uno el mensaje de error correspondiente al primer campo obligatorio que falta.

**Criterio de aceptación:**
- Con ambos campos vacíos, se muestra "Epic sadface: Username is required".
- Completando solo "Username", se muestra "Epic sadface: Password is required".
- En ningún caso la URL cambia a /inventory.html.

**Evidencia esperada:**
Screenshot de la pantalla de Login mostrando cada uno de los dos mensajes de error.

---

## TC-INVENTARIO-01 — Remover productos del carrito con error_user

- **Módulo:** Inventario
- **Tipo:** Positivo
- **Prioridad:** Media
- **Precondición:** Usuario logueado como error_user en la página https://www.saucedemo.com/inventory.html

**Pasos:**
1. Agregar un producto al carrito haciendo click en "Add to cart".
2. Clickear el botón "Remove" en el objeto recién añadido.

**Resultado esperado:**
El producto es removido del carrito de compras y vuelve a mostrar el botón "Add to cart".

**Criterio de aceptación:**
Hacemos click en el carrito y no se muestra ningún producto en la lista.

**Evidencia esperada:**
Screenshot del carrito antes y después del click en "Remove", mostrando el contador y el estado del botón.

**Defecto encontrado:**
***Severidad: Alta.*** Al hacer click en el botón "Remove", no hay comportamiento alguno. El producto sigue en el carrito, el contador no se actualiza y el botón sigue mostrando "Remove" en vez de volver a "Add to cart".

---

## TC-CARRITO-01 — Agregar y verificar productos en el carrito

- **Módulo:** Carrito
- **Tipo:** Positivo
- **Prioridad:** Alta
- **Precondición:** Usuario logueado como standard_user en la página https://www.saucedemo.com/inventory.html

**Pasos:**
1. Agregar el producto "Sauce Labs Backpack" al carrito.
2. Agregar el producto "Sauce Labs Bike Light" al carrito.
3. Verificar el contador del ícono del carrito.
4. Abrir el carrito.

**Resultado esperado:**
El contador del carrito refleja la cantidad de productos agregados, y al abrir el carrito se listan ambos productos.

**Criterio de aceptación:**
- El badge del carrito muestra "2" luego de agregar ambos productos.
- Al abrir el carrito, se listan "Sauce Labs Backpack" y "Sauce Labs Bike Light".
- La cantidad de ítems mostrados en el carrito es 2.

**Evidencia esperada:**
Screenshot del ícono del carrito con el badge en 2, y screenshot del carrito mostrando ambos productos listados.

---

## TC-CARRITO-02 — Remover producto del carrito con standard_user

- **Módulo:** Carrito
- **Tipo:** Positivo
- **Prioridad:** Alta
- **Precondición:** Usuario logueado como standard_user en https://www.saucedemo.com/inventory.html, con "Sauce Labs Backpack" y "Sauce Labs Bike Light" agregados al carrito

**Pasos:**
1. Abrir el carrito.
2. Clickear el botón "Remove" en el producto "Sauce Labs Backpack".

**Resultado esperado:**
El producto es removido del carrito de compras y, al volver al inventario, el botón vuelve a mostrar "Add to cart".

**Criterio de aceptación:**
- El carrito pasa a mostrar solo "Sauce Labs Bike Light".
- La cantidad de ítems listados en el carrito es 1.

**Evidencia esperada:**
Screenshot del carrito antes y después del click en "Remove", mostrando el listado con un solo producto restante.

---

## TC-CHECKOUT-01 — Ingreso de nombre con longitud excesiva

- **Módulo:** Checkout
- **Tipo:** Límite
- **Prioridad:** Baja
- **Precondición:** Usuario logueado, con al menos un producto en el carrito, en la pantalla "Checkout: Your Information"

**Pasos:**
1. Ingresar en el campo "First Name" una cadena de 100+ caracteres (ej. "AAAA..." repetido).
2. Completar "Last Name" y "Postal Code" con datos válidos.
3. Clickear "Continue" y luego "Finish".

**Resultado esperado:**
El sistema debería limitar la cantidad de caracteres aceptados como input.

**Criterio de aceptación:**
El campo debería mostrar un error de validación al superar cierta longitud.

**Evidencia esperada:**
Screenshot del formulario con el input largo, y screenshot del recibo final (Order Receipt) mostrando el resultado.

**Defecto encontrado:**
***Severidad: Media.*** No existe límite de caracteres en el campo "First Name". El texto ingresado desborda el contenedor en la pantalla de "Order Receipt" (sección "Ship To"), rompiendo el layout visual de la página.

---

## TC-CHECKOUT-02 — Continuar con campos obligatorios vacíos

- **Módulo:** Checkout
- **Tipo:** Límite
- **Prioridad:** Alta
- **Precondición:** Usuario logueado, con al menos un producto en el carrito, en la pantalla "Checkout: Your Information"

**Pasos:**
1. Sin completar ningún campo, clickear "Continue".
2. Completar únicamente "First Name" y clickear "Continue" nuevamente.
3. Completar también "Last Name" (dejando "Postal Code" vacío) y clickear "Continue" nuevamente.

**Resultado esperado:**
El sistema no avanza a la pantalla "Checkout: Overview" en ninguno de los tres intentos, y muestra en cada uno el mensaje de error correspondiente al primer campo obligatorio que falta.

**Criterio de aceptación:**
- Con los tres campos vacíos, se muestra "Error: First Name is required".
- Completando solo "First Name", se muestra "Error: Last Name is required".
- Completando "First Name" y "Last Name", se muestra "Error: Postal Code is required".
- En ningún caso la URL cambia a la pantalla de overview del checkout.

**Evidencia esperada:**
Screenshot del formulario mostrando cada uno de los tres mensajes de error.

---

## TC-CHECKOUT-03 — Checkout completo exitoso

- **Módulo:** Checkout
- **Tipo:** Positivo
- **Prioridad:** Alta
- **Precondición:** Usuario logueado como standard_user, con al menos un producto en el carrito, en la pantalla "Checkout: Your Information"

**Pasos:**
1. Completar "First Name", "Last Name" y "Postal Code" con datos válidos.
2. Clickear "Continue".
3. Revisar el resumen de la orden en la pantalla "Checkout: Overview".
4. Clickear "Finish".

**Resultado esperado:**
El sistema procesa la orden y muestra la pantalla de confirmación de compra.

**Criterio de aceptación:**
Se visualiza el mensaje "Thank you for your order!" en la pantalla "Checkout: Complete!".

**Evidencia esperada:**
Screenshot de la pantalla "Checkout: Complete!" con el mensaje de confirmación visible.

---

## TC-MENU-01 — Logout desde el menú y bloqueo de acceso directo al inventario

- **Módulo:** Navegación / Menú
- **Tipo:** Positivo
- **Prioridad:** Media
- **Precondición:** Usuario logueado como standard_user en la página https://www.saucedemo.com/inventory.html

**Pasos:**
1. Clickear el ícono de menú en la esquina superior izquierda.
2. Clickear la opción "Logout".
3. Con la sesión ya cerrada, escribir directamente en el navegador la URL https://www.saucedemo.com/inventory.html.

**Resultado esperado:**
El sistema cierra la sesión y redirige a la pantalla de Login. El intento posterior de acceder directamente a la URL del inventario sin sesión activa también redirige a la pantalla de Login, sin mostrar el listado de productos.

**Criterio de aceptación:**
- Después del logout, la URL vuelve a https://www.saucedemo.com/ y se visualiza el formulario de login.
- Al navegar directamente a /inventory.html sin sesión, el sistema redirige nuevamente a la pantalla de Login en vez de mostrar los productos.

**Evidencia esperada:**
Screenshot de la pantalla de Login inmediatamente después del logout, y screenshot del intento de acceso directo a /inventory.html mostrando la redirección a Login.
