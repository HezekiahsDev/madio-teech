# madio-teech

## Temporary Simulation Mode (Backend Down)

The app now supports a dev simulation mode for auth and wallet APIs so you can
test login, biometrics, unlock flow, balance, and transaction rendering without
the backend.

- Enabled by default in development (`__DEV__`).
- Disable simulation by setting `EXPO_PUBLIC_USE_SIMULATED_API=0`.

### Notes

- Normal login works with any non-empty username/password in simulation mode.
- To test stale biometric credential remediation:
  - Login manually with a username starting with `biofail` (e.g. `biofail_demo`).
  - Enable biometrics.
  - Biometric login will fail repeatedly and should auto-disable after 3 failed credential attempts.
