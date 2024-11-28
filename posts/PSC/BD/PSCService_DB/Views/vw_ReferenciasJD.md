# View: vw_ReferenciasJD

## Usa los objetos:
- [[Clasificacion1]]
- [[Clasificacion6]]
- [[Referencias]]
- [[ReferenciasTarifas]]

```sql



CREATE view [dbo].[vw_ReferenciasJD] as
select distinct r.FechaAlta,r.FechaMod,r.PkReferencias,DescripcionReferencia=r.Descripcion,r.PkFkMR,r.FkUnidadesMedida,
t.FkClasificacion1,DescripcionClasificacion1=c1.Descripcion,t.FkClasificacion6,DescripcionClasificacion2=c6.Descripcion
from		[192.168.90.10\SPIGAPLUS].[DMS00280].re.Referencias			r	with (nolock)
left join	[192.168.90.10\SPIGAPLUS].[DMS00280].RE.ReferenciasTarifas	t	with (nolock)	on	r.PkfkMR = t.PkFkMR
											and r.PkReferencias = t.PkFkReferencias
left join	[192.168.90.10\SPIGAPLUS].[DMS00280].re.Clasificacion1		c1	with (nolock)	on	r.PkFkMR = c1.PkFkMR
											and t.pkfktarifas = c1.PkFkTarifas
											and t.FkClasificacion1 = c1.PkClasificacion1
left join   [192.168.90.10\SPIGAPLUS].[DMS00280].re.Clasificacion6		C6	with (nolock) on r.PkFkMR=C6.PkFkMR 
											and t.pkfktarifas=C6.pkfktarifas 
											and t.FkClasificacion6=C6.PkClasificacion6
where r.FechaBaja is null
and r.PkFkMR in ('BEN','CIB','FOR','HAM','JOH','KLE','MAZ','MOT','OTR','RIV','RNL','VAG','VOG','WIR','BNP')

```
