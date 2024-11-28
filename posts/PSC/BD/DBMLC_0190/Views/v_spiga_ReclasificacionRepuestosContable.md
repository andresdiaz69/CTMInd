# View: v_spiga_ReclasificacionRepuestosContable

## Usa los objetos:
- [[spiga_ContabilidadMovimientos]]

```sql


CREATE view [dbo].[v_spiga_ReclasificacionRepuestosContable] as
select   * 
from [PSCService_DB].dbo.spiga_ContabilidadMovimientos
where Departamento = 'RE'
and IdEmpresas  in (1,5,6,22)

```
