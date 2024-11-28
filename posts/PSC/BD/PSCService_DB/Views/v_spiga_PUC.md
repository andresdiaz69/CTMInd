# View: v_spiga_PUC

## Usa los objetos:
- [[ContCtas]]

```sql




CREATE view [dbo].[v_spiga_PUC] as
select CodigoCuenta=PkContCtas,Nombre,FkContCtatipos,TipoCalculo,FkContNiveles
from [192.168.90.10\SPIGAPLUS].[DMS00280].[FI].[ContCtas]
where PkFkEmpresas=1
and FechaBaja is null
and FkContNiveles = 6

```
