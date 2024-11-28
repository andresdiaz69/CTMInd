# View: V_Provision_Totales

## Usa los objetos:
- [[Provision_OT_Compania]]
- [[Provision_OT_Resultado]]

```sql

CREATE VIEW V_Provision_Totales
AS
SELECT	Fecha = CONVERT(DATE, R.Fecha), C.Compania, R.IdCentro, R.IdSeccion, IdMarca, 
		Seccion = UPPER(R.Departamento), ValorAcumulado = CONVERT(DECIMAL(16,0), R.VrAcumulado),
		SumaVAR = CONVERT(DECIMAL(16,0), R.VrActual), ValorACargar = CONVERT(DECIMAL(16,0), R.VrProvision),
		R.Cuentas, R.Naturaleza
FROM	Provision_OT_Resultado R, Provision_OT_Compania C
WHERE	R.IdEmpresa = C.IdCompania AND (R.VrActual <> 0 OR R.VrAcumulado <> 0 OR R.VrProvision <> 0)

```
