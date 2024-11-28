# View: vw_ventasposventaEmpresasMarcasCentros

## Usa los objetos:
- [[vw_VentaRepuestos_ClientesVEH]]

```sql
CREATE VIEW [dbo].[vw_ventasposventaEmpresasMarcasCentros] AS
SELECT CodigoEmpresa,empresa,CodigoMarca,marca,CodigoCentro,Centro
FROM vw_VentaRepuestos_ClientesVEH
WHERE Año >= YEAR(DATEADD(YEAR,-2,GETDATE()))
GROUP BY CodigoEmpresa,empresa,CodigoMarca,marca,CodigoCentro,Centro

```
