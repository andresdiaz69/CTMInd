# View: vw_AsesoresCreditosSeguros_Financieras

## Usa los objetos:
- [[v_MLC_Maestras]]
- [[v_ultima_version_maestras]]

```sql
CREATE view [dbo].[vw_AsesoresCreditosSeguros_Financieras] as
select distinct s.Desde,s.Hasta,s.valor,s.CodigoEmpresa,
s.NombreEmpresa,s.NombreMaestra,CodigoTercero=substring(s.NombreMaestra,1,charindex('/',s.NombreMaestra,1)-1)
from		v_ultima_version_maestras		m
left join	v_MLC_Maestras					s	on	m.IdRangoMaestra = s.IdRangoMaestra
													and m.Idrangoversion = s.IdRangoVersion
													and m.ConsecutivoVersion = s.ConsecutivoVersion	
where m.IdRangoMaestra in (371,372,373,374,375,376,377,378,379,380,381,382,383,384,372)
and s.valor <> 0

```
