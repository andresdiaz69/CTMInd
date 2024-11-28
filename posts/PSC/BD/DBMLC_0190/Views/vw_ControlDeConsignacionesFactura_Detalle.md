# View: vw_ControlDeConsignacionesFactura_Detalle

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[ComisionesSpigaTallerPorOT]]
- [[ComisionesSpigaVNFechaFactura]]
- [[ComisionesSpigaVOFechafactura]]

```sql


CREATE view [dbo].[vw_ControlDeConsignacionesFactura_Detalle] as

--select distinct case when com.CedulaVendedorRepuestos = 0 then com.CedulaBodeguero else com.CedulaVendedorRepuestos end as CedulaVendedor,com.CodigoEmpresa,com.Empresa,com.CodigoCentro,com.Centro,com.CodigoSeccion,com.Seccion,com.FechaFactura,com.NumeroFactura,v.CodigoMarca,v.Marca,('REP') Tipo from ComisionesSpigaAlmacenAlbaran com
--left join vw_Centros c on com.CodigoCentro = c.CodigoCentro
--left join VehiculosMarcas v on c.SiglaMarca = v.SiglaMarca
--union all
--select distinct CedulaVendedor,CodigoEmpresa,Empresa,CodigoCentro,Centro,CodigoSeccion,Seccion,FechaFactura,NumeroFactura,CodigoMarca,NombreMarca,Tipo from vw_ControlDeConsignacionesTaller
--union all
--select distinct CedulaVendedor,CodigoEmpresa,Empresa,CodigoCentro,Centro,CodigoSeccion,Seccion,FechaFactura,NumeroFactura=replace(NumeroFactura,'/','\'),CodigoMArca,Marca,('VN')Tipo from ComisionesSpigaVNFechaFactura
--union all
--select distinct CedulaVendedor,CodigoEmpresa,Empresa,CodigoCentro,Centro,CodigoSeccion,Seccion,FechaFactura, NumeroFactura=replace(NumeroFactura,'/','\'),CodigoMArca,Marca,('VO')Tipo  from ComisionesSpigaVOFechafactura 
select  CedulaVendedor,CodigoEmpresa,Empresa,CodigoCentro,Centro,CodigoSeccion,Seccion,FechaFactura,NumeroFactura,Concepto,
Marca = case when marca = 'BN' then 'Bonaparte'
			 when marca = 'CO' then 'Colision'
             when marca = 'DAI.C' then 'Daimler Comerciales'
             when marca = 'DAI.V' then 'Daimler Vehiculos'
             when marca = 'FR' then 'Ford'
             when marca = 'Hamm' then 'Wirtgen'
             when marca = 'IR' then 'Israriego'
             when marca = 'JD' then 'John Deere'
             when marca = 'MIT' then 'Mitsubishi'
             when marca = 'MZ' then 'Mazda'
             when marca = 'RN' then 'Renault'
             when marca = 'USC CT' then 'USC'
             when marca = 'VO' then 'Usados'
             when marca = 'VÖGELE' then 'Wirtgen'
             when marca = 'VW' then 'Volkswagen'
else marca   end

FROM(

             select vn.CedulaVendedor,vn.Codigoempresa,vn.Empresa,vn.CodigoCentro,vn.Centro,vn.CodigoSeccion,vn.Seccion,vn.FechaFactura,NumeroFactura=replace(vn.NumeroFactura,'/','\')
			 ,concepto = 'VN',Marca

             from ComisionesSpigaVNFechaFactura      vn

             --where year(v.FechaFactura) = 2019

             union all


             select vo.CedulaVendedor,vo.Codigoempresa,vo.Empresa,vo.CodigoCentro,vo.Centro,vo.CodigoSeccion,vo.Seccion,vo.FechaFactura,NumeroFactura=replace(vo.NumeroFactura,'/','\')
			 ,concepto = 'VO',MArca = 'VO'

             from ComisionesSpigaVOFechafactura      vo

             --where year(v.FechaFactura) = 2019

             union all

		     select  case when a.CedulaVendedorRepuestos = 0 then a.CedulaBodeguero else a.CedulaVendedorRepuestos end as CedulaVendedor
			 ,a.CodigoEmpresa,a.Empresa,a.CodigoCentro,a.Centro,a.CodigoSeccion,a.Seccion,a.FechaFactura,a.NumeroFactura
			 ,concepto = 'REP',
             marca=substring(centro,1,charindex('-',centro,1)-1)

             from ComisionesSpigaAlmacenAlbaran a

             --where year(a.FechaFactura) = 2019
			 
             UNION ALL

             select a.CedulaVendedor,a.CodigoEmpresa,a.Empresa,a.CodigoCentro,a.Centro,a.CodigoSeccion,a.Seccion,a.FechaFactura,NumeroFactura = Tipo2 + '\' + numero + '\' + año
			 ,concepto = Tipo
             ,marca=substring(centro,1,charindex('-',centro,1)-1)

             from(

			   select distinct (CedulaAsesorServicioResponsable)CedulaVendedor,CodigoEmpresa,Empresa,CodigoCentro,Centro,CodigoSeccion,Seccion,FechaFactura
			   ,NumeroFacturaTaller,(Marcaveh)CodigoMarca,NombreMarca,('TAL')Tipo ,Año=substring(NumeroFacturaTaller,1,4),

			   Numero = substring(NumeroFacturaTaller,(CHARINDEX('\',NumeroFacturaTaller,6)+1),5),

			   Tipo2 = substring(NumeroFacturaTaller,6,(CHARINDEX('\',NumeroFacturaTaller,6)-1) - (CHARINDEX('\',NumeroFacturaTaller,1)))

			   from ComisionesSpigaTallerPorOT

			 )a
			 where Centro <>'Operaciones Cerradas'
             --where year(a.FechaFactura) = 2019
)x


```
