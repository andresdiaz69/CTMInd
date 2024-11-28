# View: vw_RepuestosV2_Bolsas_Administrativa_2

## Usa los objetos:
- [[Cargos]]
- [[EmpleadosActivos]]

```sql



CREATE VIEW [dbo].[vw_RepuestosV2_Bolsas_Administrativa_2]
AS
SELECT        Ano_Periodo, Mes_Periodo, codigo_centro, nombre_centro, COUNT(*) AS CantidadEmpleados
FROM            dbo.EmpleadosActivos
WHERE Codigo_Cargo IN 
(

--CARGOS PARA LOS QUE APLICA LA BOLSA
SELECT [CodigoCargo] FROM [Cargos] WHERE AplicaBolsaRepuestos = 1

)
GROUP BY Ano_Periodo, Mes_Periodo, codigo_centro, nombre_centro

```
