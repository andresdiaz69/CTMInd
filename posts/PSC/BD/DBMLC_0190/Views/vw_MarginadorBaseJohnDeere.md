# View: vw_MarginadorBaseJohnDeere

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[v_Marginador_TipoVentasJohnDeere]]

```sql
CREATE view [dbo].[vw_MarginadorBaseJohnDeere] as
--MS: 070923 -- se agrega el filtro a.NumeroFactura not like 'DEP%
select distinct a.Ano_Periodo,  a.Mes_Spiga,          a.CodigoEmpresa,  a.Empresa,
	   a.CodigoCentro,          a.Centro,             a.CodigoSeccion,  a.Seccion,
	   a.FechaFactura,			NumeroFactura =replace(a.NumeroFactura,'\','/'),
	   Marca,a.Referencia,      a.TipoMov,            m.descripcionpedidotipoventas,
	   ValorNeto,                    a.Clasificacion5Mov,  Clasificacion6Mov
  from [DBMLC_0190].dbo.ComisionesSpigaAlmacenAlbaran		a
  left join	[DBMLC_0190].dbo.v_Marginador_TipoVentasJohnDeere (nolock) m on a.CodigoEmpresa=m.IdEmpresas	
																	    and a.CodigoCentro = m.IdCentros
																	    and a.CodigoSeccion = m.IdSecciones
																	    and a.NumeroFactura = m.numerofactura
																	    --and a.Referencia = m.IdReferencias	
																	    and a.TipoMov = m.IdMovimientoTipos
where a.NumeroFactura not like 'DEP%'
--and a.Ano_Periodo =2023
--and a.Mes_Spiga =2 --30.642
-- and a.NumeroFactura = 'DEP\223\2023'

```
