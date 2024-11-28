# View: vw_inventario_asonac

## Usa los objetos:
- [[spiga_InventarioRepuestosDetallado]]
- [[spiga_StockRepuestos]]
- [[UnidadDeNegocio]]

```sql




CREATE view [dbo].[vw_inventario_asonac] as
select distinct  
f.IdReferencias codigo,	 
f.Descripcion descripcion, 
precio = 1,
t_material = case when f.idmr = 'MCS' then 'ZR48' else 'ZR53' end,
promocion = 0,
cantidad = 1,				  
codigo_sucursal =   case	
					when f.IdCentros = 91	then 'BVM20'
					when f.IdCentros = 106	then 'BVM22'
					when f.IdCentros = 175	then 'BVM17'
					when f.IdCentros = 152	then 'BVM23'
					when f.IdCentros = 130	then 'BVM19'
					when f.IdCentros = 174	then 'BVM14'
					when f.IdCentros = 173	then 'BVM15'
					when f.IdCentros = 98	then 'BVM21'
					when f.IdCentros = 171	then 'BVM18'
					when f.IdCentros = 172	then 'BVM16'
					when f.IdCentros = 176	then 'BVM17'
end 		
from		[PSCService_DB].dbo.spiga_StockRepuestos                    f    
inner join	[PSCService_DB].dbo.spiga_InventarioRepuestosDetallado		g   on g.IdReferencias = f.IdReferencias
																			and g.idMr          = g.idMr
																			and g.IdCentros     = f.IdCentros
																			and g.ano_periodo   = f.ano_periodo                    
left join [DBMLC_0190].dbo.UnidadDeNegocio   							u   on f.IdEmpresas  = u.CodEmpresa 
																			and f.IdCentros   = u.CodCentro
                                                    						and f.IdSecciones = u.CodSeccion
where u.CodUnidadNegocio in (1,3)
and f.IdCentros in (91,10,175,152,130,174,173,98,171,172,176)
and f.ano_periodo      = year(GETDATE())
and f.mes_periodo      = month(GETDATE())
and f.stock            > 0
and f.idMR             in ('MCS','MCV')

```
