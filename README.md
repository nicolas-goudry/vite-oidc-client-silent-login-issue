# vite-oidc-client-silent-login-issue

This is a repository reproducing the [Automatic login of opened tabs (#1055)](https://github.com/AxaFrance/oidc-client/issues/1055) issue with react-oidc.

## Configure

Update the `.env` file to match your OIDC server configuration.

```
VITE_IDP_URL=http://localhost:9000/realms/main
VITE_IDP_CLIENT=repro-vite-react-oidc-issue
```

## Run

Start the Vite development server with `npm run dev`.

Access the application on local port 3000.

## Reproduce the issues

### OIDC user info are not available after silent login

1. Open a browser tab and navigate to `localhost:3000` (will call this tab the « main » tab)
2. Open a second browser tab and navigate to `localhost:3000` (will call this tab the « other » tab)
3. From the main tab, click on the sign in button and perform the authentication process until success
4. The main tab will be redirected to the auth success callback route, which will notify of a login through localStorage
5. The other tab will receive the notification and perform a silent login
6. The user initials will not be available as [`oidcUser`](src/auth-menu/auth-menu.tsx#L28) is falsy

### Error: state not valid after silent login

Uncomment [lines 18 to 22 of the auth-menu component](src/auth-menu/auth-menu.tsx#L18-L22) and perform the exact same reproducing steps from the previous issue.

Notice that in the other tab, there seems to be a race condition between Vite service worker and Oidc service worker:

```
VM510 client:324 [vite] connected.
VM520 client:324 [vite] connected.
VM550 @axa-fr_react-oidc.js:380 TypeError: Failed to fetch
    at ue (VM563 @axa-fr_react-oidc.js:379:32)
    at Object.c [as startKeepAliveServiceWorker] (VM563 @axa-fr_react-oidc.js:441:37)
    at VM563 @axa-fr_react-oidc.js:826:129
VM563 @axa-fr_react-oidc.js:380 TypeError: Failed to fetch
    at ue (VM563 @axa-fr_react-oidc.js:379:32)
    at Object.c [as startKeepAliveServiceWorker] (VM563 @axa-fr_react-oidc.js:441:37)
    at VM563 @axa-fr_react-oidc.js:826:129
VM598 client:229 [vite] connecting...
VM600 client:229 [vite] connecting...
VM598 client:324 [vite] connected.
VM600 client:324 [vite] connected.
VM630 @axa-fr_react-oidc.js:888 Error: state not valid (expected: SE2nDbn2sgzv7E7W, received: 6Hqml2BxtSn6pQF8)
    at VM630 @axa-fr_react-oidc.js:859:13
    at async t (VM643 @axa-fr_react-oidc.js:1109:17)
(anonymous) @ VM630 @axa-fr_react-oidc.js:888
await in (anonymous) (async)
t @ VM630 @axa-fr_react-oidc.js:1109
loginCallbackAsync @ VM630 @axa-fr_react-oidc.js:1112
silentLoginCallbackAsync @ VM630 @axa-fr_react-oidc.js:1023
silentLoginCallbackAsync @ VM630 @axa-fr_react-oidc.js:1276
(anonymous) @ VM630 @axa-fr_react-oidc.js:1971
(anonymous) @ VM630 @axa-fr_react-oidc.js:1972
commitHookEffectListMount @ VM614 react-dom_client.js:16904
commitPassiveMountOnFiber @ VM614 react-dom_client.js:18152
commitPassiveMountEffects_complete @ VM614 react-dom_client.js:18125
commitPassiveMountEffects_begin @ VM614 react-dom_client.js:18115
commitPassiveMountEffects @ VM614 react-dom_client.js:18105
flushPassiveEffectsImpl @ VM614 react-dom_client.js:19486
flushPassiveEffects @ VM614 react-dom_client.js:19443
(anonymous) @ VM614 react-dom_client.js:19324
workLoop @ VM614 react-dom_client.js:197
flushWork @ VM614 react-dom_client.js:176
performWorkUntilDeadline @ VM614 react-dom_client.js:384
Show 18 more frames
Show less
VM630 @axa-fr_react-oidc.js:1025 Error: state not valid (expected: SE2nDbn2sgzv7E7W, received: 6Hqml2BxtSn6pQF8)
    at VM630 @axa-fr_react-oidc.js:859:13
    at async t (VM643 @axa-fr_react-oidc.js:1109:17)
silentLoginCallbackAsync @ VM630 @axa-fr_react-oidc.js:1025
await in silentLoginCallbackAsync (async)
silentLoginCallbackAsync @ VM630 @axa-fr_react-oidc.js:1276
(anonymous) @ VM630 @axa-fr_react-oidc.js:1971
(anonymous) @ VM630 @axa-fr_react-oidc.js:1972
commitHookEffectListMount @ VM614 react-dom_client.js:16904
invokePassiveEffectMountInDEV @ VM614 react-dom_client.js:18320
invokeEffectsInDev @ VM614 react-dom_client.js:19697
commitDoubleInvokeEffectsInDEV @ VM614 react-dom_client.js:19682
flushPassiveEffectsImpl @ VM614 react-dom_client.js:19499
flushPassiveEffects @ VM614 react-dom_client.js:19443
(anonymous) @ VM614 react-dom_client.js:19324
workLoop @ VM614 react-dom_client.js:197
flushWork @ VM614 react-dom_client.js:176
performWorkUntilDeadline @ VM614 react-dom_client.js:384
Show 14 more frames
Show less
VM630 @axa-fr_react-oidc.js:1025 Error: state not valid (expected: SE2nDbn2sgzv7E7W, received: 6Hqml2BxtSn6pQF8)
    at VM630 @axa-fr_react-oidc.js:859:13
    at async t (VM643 @axa-fr_react-oidc.js:1109:17)
```
