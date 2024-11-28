# View: v_MLC_Maestras

## Usa los objetos:
- [[ComisionesModelos]]
- [[ComisionesModelosSub]]
- [[Empresas]]
- [[RangosDetalles]]
- [[RangosMaestras]]
- [[RangosVersiones]]

```sql
create view v_MLC_Maestras as
select d.IdRangoVersion,d.IdRangoDetalle,v.ConsecutivoVersion,
d.Desde,d.Hasta,d.Valor,s.CodigoEmpresa,e.NombreEmpresa,
s.IdComisionModelo,c.NombreModelo,m.IdComisionModeloSub,s.NombreModeloSub,v.IdRangoMaestra,m.NombreMaestra
from		RangosDetalles			d
left join	RangosVersiones			v	on	d.IdRangoVersion = v.IdRangoVersion
left join	RangosMaestras			m	on	v.IdRangoMaestra = m.IdRangoMaestra
left join	ComisionesModelosSub	s	on	m.IdComisionModeloSub = s.IdComisionModeloSub
left join	ComisionesModelos		c	on	c.IdComisionModelo = s.IdComisionModelo
left join	Empresas				e	on	e.CodigoEmpresa = s.CodigoEmpresa
--where m.IdRangoMaestra in (151,152,138,137,123,148,149,124,116,117,144,143)
--where m.IdComisionModeloSub = 12
--order by s.CodigoEmpresa,c.NombreModelo,IdRangoMaestra,IdRangoVersion

--Tomar el máximo consecutivo versión

```
