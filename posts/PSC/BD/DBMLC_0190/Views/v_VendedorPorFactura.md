# View: v_VendedorPorFactura

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[ComisionesSpigaTallerPorOT]]
- [[ComisionesSpigaVNFechaFactura]]
- [[ComisionesSpigaVOFechafactura]]

```sql
CREATE view v_VendedorPorFactura as
select CodigoEmpresa,NumeroFactura = Serie + '/' + numero + '/' + año,CedulaVendedor,NombreVendedor
from(
		select CodigoEmpresa,NumeroFactura,
		Año=case when numerofactura like '%\%' then substring(Numerofactura,1,CHARINDEX('\',NumeroFactura,1)-1) else '' end,
		Serie=case when numerofactura like '%\%' then  substring(Numerofactura,CHARINDEX('\',NumeroFactura,1)+1,CHARINDEX('\',NumeroFactura,6)-CHARINDEX('\',NumeroFactura,1)-1) else '' end,
		Numero=case when numerofactura like '%\%' then  substring(Numerofactura,CHARINDEX('\',NumeroFactura,1)+CHARINDEX('\',NumeroFactura,6)-CHARINDEX('\',NumeroFactura,1)+1,10) else '' end,
		CedulaVendedor,NombreVendedor
		from(	
			select distinct CodigoEmpresa,NumeroFactura=NumeroFacturaTaller,CedulaVendedor=CedulaAsesorServicioResponsable,NombreVendedor=AsesorServicioResponsable
			from ComisionesSpigaTallerPorOT
			where FechaFactura > '20180101'
			--and NumeroFacturaTaller like '%T073%'
			--and NumeroFacturaTaller like '%100940%'
		)a
		
		union all
		
		select distinct CodigoEmpresa,NumeroFactura,
		Año=case when numerofactura like '%\%' then  substring(Numerofactura,CHARINDEX('\',NumeroFactura,1)+CHARINDEX('\',NumeroFactura,6)-CHARINDEX('\',NumeroFactura,1)+1,10) else '' end,
		Serie=case when numerofactura like '%\%' then substring(Numerofactura,1,CHARINDEX('\',NumeroFactura,1)-1) else '' end,
		Numero=case when numerofactura like '%\%' then  substring(Numerofactura,CHARINDEX('\',NumeroFactura,1)+1,CHARINDEX('\',NumeroFactura,6)-CHARINDEX('\',NumeroFactura,1)-1) else '' end,
		CedulaVendedor,NombreVendedor
		from(	
			select distinct CodigoEmpresa,NumeroFactura,CedulaVendedor=CedulaVendedorRepuestos,NombreVendedor=NombreVendedorRepuestos
			from ComisionesSpigaAlmacenAlbaran
			where FechaFactura > '20180101'
			--and numerofactura like '%R029%'
			--and NumeroFactura like '%101273%'
		)b
)d

union all

select Codigoempresa,NumeroFactura,CedulaVendedor,NombreVendedor
from ComisionesSpigaVNFechaFactura
				
union all
		
select Codigoempresa,NumeroFactura,CedulaVendedor,NombreVendedor
from ComisionesSpigaVOFechafactura

```
