# View: vw_ComercialVNPorFinV2_1

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[ComisionesSpigaVN]]
- [[ComisionesSpigaVO]]
- [[ComisionesSpigaVO]]
- [[spiga_FacturasCargosAdicionales]]

```sql
CREATE VIEW [dbo].[vw_ComercialVNPorFinV2_1]
AS

select distinct 

CASE 
WHEN a.FechaFactura >= '20240101' AND a.FechaFactura <= '20240220' THEN 2024 -- JCS:21/02/2024 - CASO ESPECIAL PARA LA PRIMERA LIQUIDACIÓN
WHEN DAY(a.FechaFactura) <= 20 THEN YEAR(DATEADD(MONTH, -1, a.FechaFactura)) -- JCS:16/03/2024 - NORMALIZACIÓN CORTES 21 DEL MES ANTERIOR AL 20 DEL MES ACTUAL
ELSE YEAR(a.FechaFactura)
END AS Ano_Periodo,

CASE 
WHEN a.FechaFactura >= '20240101' AND a.FechaFactura <= '20240220' THEN 1 -- JCS:21/02/2024 - CASO ESPECIAL PARA LA PRIMERA LIQUIDACIÓN
WHEN DAY(a.FechaFactura) <= 20 THEN MONTH(DATEADD(MONTH, -1, a.FechaFactura)) -- JCS:16/03/2024 - NORMALIZACIÓN CORTES 21 DEL MES ANTERIOR AL 20 DEL MES ACTUAL
ELSE MONTH(a.FechaFactura)
END AS Mes_Periodo,

a.Vin,  v.codigoMarca AS CodigoMarca, v.Marca,   v.CodigoGama, v.Gama, v.AñoModelo , v.Modelo,v.preciolista -v.valordto ValorNeto,
       v.TotalFactura , v.FechaEntregaCliente,   v.NumeroFactura  NumeroFacturaVehiculo, v.CedulaVendedor, v.NombreVendedor,a.IdTerceros IdFinanciera,  --v.Nit, 
	   isnull(a.Nombre,'')+' '+isnull(a.Apellido1,'')+''+isnull(a.Apellido2,'') Financiera,  a.BaseImponible,IvaImporte , a.FechaFactura FechaFacturaFinanciera, 
	   a.IdEmpresas, v.Empresa,v.Centro, v.Seccion, isnull(a.SerieFactura,'')+'/'+isnull(a.NumFactura,'')+'/'+ISNULL(a.AñoFactura,'') Factura_financiera,
	   v.nit Documento,v.NombreTercero
  from [PSCService_DB].dbo.spiga_FacturasCargosAdicionales a								
   join [DBMLC_0190]..ComisionesSpigaVN v on v.VIN = a.VIN  and v.Codigoempresa = a.IdEmpresas                                  
   join (  select Nit, Empresa, vin, gama, sum(EntregaEfectiva) entrega , MAX(NumeroFactura) fac 
	         from ComisionesSpigaVN c   
			where EntregaEfectiva=1 
		   group by Nit, Empresa, vin, gama) ce on ce.VIN = v.vin
		                                       and ce.Nit = v.nit
											   and ce.Empresa =v.Empresa
											   and ce.Gama = v.Gama
											   and ce.fac =v.NumeroFactura
 where (a.IdEmpresas = 1
   and ce.entrega>0
   and a.Ano_Periodo = v.Ano_Periodo   
   and v.EntregaEfectiva >0
   and a.IdFacturaCargoAdicionalTipos in (1,19)
   and v.Nit not in ('8300049938','9005736668','9013893271','9002830997','8001585381','9003539391','8600190638','9003362494')
)
OR
(a.IdEmpresas = 6
   and ce.entrega>0
   and a.Ano_Periodo = v.Ano_Periodo   
   and v.EntregaEfectiva >0
   and a.IdFacturaCargoAdicionalTipos in (9,14)
   and v.Nit not in ('8300049938','9005736668','9013893271','9002830997','8001585381','9003539391','8600190638','9003362494')
)

union all

select distinct 

CASE 
WHEN a.FechaFactura >= '20240101' AND a.FechaFactura <= '20240220' THEN 2024 -- JCS:21/02/2024 - CASO ESPECIAL PARA LA PRIMERA LIQUIDACIÓN
WHEN DAY(a.FechaFactura) <= 20 THEN YEAR(DATEADD(MONTH, -1, a.FechaFactura)) -- JCS:16/03/2024 - NORMALIZACIÓN CORTES 21 DEL MES ANTERIOR AL 20 DEL MES ACTUAL
ELSE YEAR(a.FechaFactura)
END AS Ano_Periodo,

CASE 
WHEN a.FechaFactura >= '20240101' AND a.FechaFactura <= '20240220' THEN 1 -- JCS:21/02/2024 - CASO ESPECIAL PARA LA PRIMERA LIQUIDACIÓN
WHEN DAY(a.FechaFactura) <= 20 THEN MONTH(DATEADD(MONTH, -1, a.FechaFactura)) -- JCS:16/03/2024 - NORMALIZACIÓN CORTES 21 DEL MES ANTERIOR AL 20 DEL MES ACTUAL
ELSE MONTH(a.FechaFactura)
END AS Mes_Periodo,

a.Vin, vo.codigoMarca AS CodigoMarca, vo.Marca, vo.CodigoGama, vo.Gama, vo.AñoModelo , vo.Modelo,vo.preciolista -vo.valordto ValorNeto,
       vo.TotalFactura, vo.FechaEntregaCliente,   vo.NumeroFactura NumeroFacturaVehiculo, vo.CedulaVendedor, vo.NombreVendedor,a.IdTerceros IdFinanciera, --vo.Nit,
	   isnull(a.Nombre,'')+' '+isnull(a.Apellido1,'')+''+isnull(a.Apellido2,'') Financiera,  a.BaseImponible,IvaImporte , a.FechaFactura FechaFacturaFinanciera, 
	   a.IdEmpresas, vo.Empresa,vo.Centro,vo.Seccion, isnull(a.SerieFactura,'')+'/'+isnull(a.NumFactura,'')+'/'+ISNULL(a.AñoFactura,'') Factura_financiera,
 	   vo.nit Documento,vo.NombreTercero
  from [PSCService_DB].dbo.spiga_FacturasCargosAdicionales a  
  join [DBMLC_0190]..ComisionesSpigaVo vo  on vo.VIN = a.VIN and vo.Codigoempresa = a.IdEmpresas 
  join (   select Nit, Empresa, vin, gama, sum(EntregaEfectiva) entrega , MAX(NumeroFactura) fac 
	         from ComisionesSpigaVo co  			
			where EntregaEfectiva=1 
		   group by Nit, Empresa, vin, gama) co on co.VIN = vo.vin
		                                       and co.Nit = vo.nit
											   and co.Empresa =vo.Empresa
											   and co.Gama = vo.Gama
											   and co.fac =vo.NumeroFactura
											   and vo.centro NOT like 'VO-%' 
                                               and vo.Seccion LIKE '%vo%'
                                               and vo.Codigoempresa <> 24
		
 where (a.IdEmpresas = 1
   and co.entrega>0
   and a.Ano_Periodo = vo.Ano_Periodo   
   and vo.EntregaEfectiva >0
   and a.IdFacturaCargoAdicionalTipos in (1,19)
)
OR
(a.IdEmpresas = 6
   and co.entrega>0
   and a.Ano_Periodo = vo.Ano_Periodo   
   and vo.EntregaEfectiva >0
   and a.IdFacturaCargoAdicionalTipos in (9,14)
)


```
