# View: vw_ConsultaClienteCartera

## Usa los objetos:
- [[Empresas]]
- [[spiga_Cartera]]
- [[spiga_Terceros]]

```sql
CREATE view [dbo].[vw_ConsultaClienteCartera] as
select s.Ano_Periodo,s.Mes_Periodo,s.IdEmpresas,e.NombreEmpresa,s.IdTerceros,t.NifCif,s.NombreTercero,
s.DiaDesde,s.DiaHasta,Valor=sum(s.ImportePendiente)
from		[PSCService_DB].dbo.spiga_Cartera		s
left join	[PSCService_DB].dbo.spiga_Terceros	t	on	s.IdTerceros = t.PkTerceros
left join	Empresas							e	on	s.IdEmpresas = e.CodigoEmpresa
where IdSituacionEfectos = 7
and s.Ano_Periodo = year(getdate())
and s.Mes_Periodo = month(getdate())
--s.diahasta > 360
--and s.Ano_Periodo = 2021
--and s.Mes_Periodo = 6
group by s.Ano_Periodo,s.Mes_Periodo,s.IdEmpresas,e.NombreEmpresa,s.IdTerceros,t.NifCif,s.NombreTercero,s.DiaDesde,s.DiaHasta

```
