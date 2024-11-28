# View: v_spiga_UbicacionMayoristaMinorista

## Usa los objetos:
- [[Ubicaciones]]

```sql




CREATE view [dbo].[v_spiga_UbicacionMayoristaMinorista] as
select PkUbicaVNO,Descripcion
from [192.168.90.10\SPIGAPLUS].[DMS00280].cl.Ubicaciones
where PkFkEmpresas in (6)
and fechaBaja is null
and FkUbicacionesTipos = 2


```
