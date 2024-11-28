# View: v_Requisiciones_CargosCriticos

## Usa los objetos:
- [[Cargos]]
- [[Requisiciones_Cargos]]
- [[vw_UnidadDeNegocio]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_CargosCriticos] AS
SELECT DISTINCT RC.CodigoCargo, C.NombreCargo, RC.CodigoMarca, (U.NombreUnidadNegocio)NombreMarca, ISNULL(RC.Critico, 0)Critico
FROM  Requisiciones_Cargos	RC
LEFT JOIN Cargos C	ON RC.CodigoCargo = C.CodigoCargo
LEFT JOIN vw_UnidadDeNegocio U	ON U.CodUnidadNegocio = RC.CodigoMarca
WHERE C.Obsoleto = 0 AND C.Activo = 1

```
