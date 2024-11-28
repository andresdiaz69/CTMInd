# View: vw_cMandos_InformesDefinitivos

## Usa los objetos:
- [[vw_InformesDefinitivos]]

```sql


CREATE VIEW [dbo].[vw_cMandos_InformesDefinitivos]
AS
SELECT        CodigoPresentacion, NombrePresentacion, Balance, Año, Mes, CodigoConcepto, NombreConcepto, CodigoSede, Sede, Valor, Orden
FROM           InformesComiteDB..vw_InformesDefinitivos 

```
