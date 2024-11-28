# View: vw_SpigaPedidosTrabajosExternos

## Usa los objetos:
- [[Centros]]
- [[Empresas]]
- [[EntradasTrabajosExternosDet]]
- [[PedidosTrabajosExternos]]
- [[Terceros]]
- [[WFEntidadesEstados]]

```sql

CREATE view [dbo].[vw_SpigaPedidosTrabajosExternos] as

select distinct pte.FkTerceros, ISNULL(t.Nombre,'')+' '+ISNULL(t.Apellido1,'')+' '+ISNULL(t.Apellido1,'') Nombre, pte.FkCentros, c.Nombre Centro,
	   PkAñoPedidosTrabajosExternos, PkFkSeriesPedidosTrabajosExternos,PkNumPedidosTrabajosExternos,pte.pkfkempresas,e.Nombre empresa,pte.FechaAlta,
	   pte.FechaValidez
	   
  FROM [192.168.80.18].[DMS90280].[TA].[PedidosTrabajosExternos] pte
  left join [192.168.80.18].[DMS90280].[TA].EntradasTrabajosExternosDet et on et.FkNumPedidosTrabajosExternos = pte.PkNumPedidosTrabajosExternos
														  and et.FkAñoPedidosTrabajosExternos = pte.PkAñoPedidosTrabajosExternos
														  and et.FkSeriesPedidosTrabajosExternos = pte.PkFkSeriesPedidosTrabajosExternos
  left join [192.168.80.18].[DMS90280].CM.Terceros t on t.PkTerceros = pte.FkTerceros
  left join [192.168.80.18].[DMS90280].CM.Centros c on c.PkCentros = pte.FkCentros
  left join [192.168.80.18].[DMS90280].CM.Empresas e on e.PkEmpresas = pte.PkFkEmpresas
  left join [192.168.80.18].[DMS90280].cm.WFEntidadesEstados ee on ee.PkFkWFEntidades = pte.FkWFEntidades
									and ee.PkWFEstados = pte.FkWFEstados
 where ee.PkWFEstados =3
  AND pte.FechaValidez >= GETDATE()
  and et.FkNumPedidosTrabajosExternos is null
  --and pkNumPedidosTrabajosExternos in ('2320' ) 
  --and pte.FkTerceros = '248437'


```
