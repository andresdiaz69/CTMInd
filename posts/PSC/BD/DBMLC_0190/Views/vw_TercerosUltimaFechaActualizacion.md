# View: vw_TercerosUltimaFechaActualizacion

## Usa los objetos:
- [[spiga_Terceros]]

```sql
CREATE view [dbo].[vw_TercerosUltimaFechaActualizacion] as  

select ISNULL(PkTerceros,99) AS PkTerceros ,FkPaises,FkTerceroClases,FkTratamientos, CAST(NifCif AS varchar(50)) NifCif,
Nombre,Apellido1,Apellido2,NombreComercial,EmpresaTrabajo,  
FkProfesiones,FkTerceroCargos,FkTerceroFormacionNiveles,FechaNacimiento,NumeroHijos,FkDocumentacionTipos,FkEstadoCivilTipos,  
sexo,TipoContribuyente,FkNaturalezaJuridicaTipos  
from [PSCService_DB].dbo.spiga_Terceros  
where FechaBaja is null
--and FkNaturalezaJuridicaTipos is not null
-----and NifCif = '8920994171'
--and pkterceros = '748390'

```
