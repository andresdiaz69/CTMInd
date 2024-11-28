# View: vw_ExcesosExcesivos_Descripcion2

## Usa los objetos:
- [[vw_ExcesosExcesivos_Stock]]

```sql
CREATE view [dbo].[vw_ExcesosExcesivos_Descripcion2] as
SELECT distinct IdEmpresas, Marca=NombreUnidadNegocio,IdClasificacion2, DenominacionClasificacion2
FROM        vw_ExcesosExcesivos_Stock	s
where NombreUnidadNegocio <> 'Mazda'
--and IdClasificacion2 is not null
--order by IdEmpresas,marca

union all

SELECT distinct IdEmpresas, Marca=NombreUnidadNegocio,IdClasificacion4, DenominacionClasificacion4
FROM        vw_ExcesosExcesivos_Stock	s
where NombreUnidadNegocio = 'Mazda'
--and IdClasificacion4 is not null
--order by IdEmpresas,marca

```
