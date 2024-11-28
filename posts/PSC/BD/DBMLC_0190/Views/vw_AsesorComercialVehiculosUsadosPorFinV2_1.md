# View: vw_AsesorComercialVehiculosUsadosPorFinV2_1

## Usa los objetos:
- [[ComisionesSpigaVO]]
- [[ComisionesSpigaVO]]
- [[spiga_FacturasCargosAdicionales]]

```sql

CREATE VIEW [dbo].[vw_AsesorComercialVehiculosUsadosPorFinV2_1] AS

select distinct 
       CASE 
       WHEN a.FechaFactura >= '20240201' AND a.FechaFactura <= '20240320' THEN 2024 -- JCS:13/03/2024 - CASO ESPECIAL PARA LA PRIMERA LIQUIDACIÓN
       WHEN DAY(a.FechaFactura) <= 20 THEN YEAR(DATEADD(MONTH, -1, a.FechaFactura)) -- JCS:16/03/2024 - NORMALIZACIÓN CORTES 21 DEL MES ANTERIOR AL 20 DEL MES ACTUAL
       ELSE YEAR(a.FechaFactura)
       END AS Ano_Periodo,
	   CASE 
       WHEN a.FechaFactura >= '20240201' AND a.FechaFactura <= '20240320' THEN 2 -- JCS:13/03/2024 - CASO ESPECIAL PARA LA PRIMERA LIQUIDACIÓN
       WHEN DAY(a.FechaFactura) <= 20 THEN MONTH(DATEADD(MONTH, -1, a.FechaFactura)) -- JCS:16/03/2024 - NORMALIZACIÓN CORTES 21 DEL MES ANTERIOR AL 20 DEL MES ACTUAL
       ELSE MONTH(a.FechaFactura)
       END AS Mes_Periodo,
       a.Vin, 
       -- JCS:13/03/2024 - CASO ESPECIAL MARCA USADOS
       --vo.codigoMarca AS CodigoMarca, 
       --vo.Marca, 
       7 AS CodigoMarca, 
       'USADOS' AS Marca, 
       
       vo.CodigoGama, vo.Gama, vo.AñoModelo , vo.Modelo,vo.preciolista -vo.valordto ValorNeto,
       vo.TotalFactura, vo.FechaEntregaCliente,   vo.NumeroFactura NumeroFacturaVehiculo, vo.CedulaVendedor, vo.NombreVendedor,a.IdTerceros IdFinanciera, --vo.Nit,
	   isnull(a.Nombre,'')+' '+isnull(a.Apellido1,'')+''+isnull(a.Apellido2,'') Financiera,  a.BaseImponible,IvaImporte , a.FechaFactura FechaFacturaFinanciera, 
	   a.IdEmpresas, vo.Empresa,vo.Centro,vo.Seccion, isnull(a.SerieFactura,'')+'/'+isnull(a.NumFactura,'')+'/'+ISNULL(a.AñoFactura,'') Factura_financiera,
 	   vo.nit Documento,vo.NombreTercero
  from [PSCService_DB].dbo.spiga_FacturasCargosAdicionales a  
  join [DBMLC_0190]..ComisionesSpigaVo vo  on vo.VIN = a.VIN and vo.Codigoempresa = a.IdEmpresas 
  join (   select Empresa, vin, gama, sum(EntregaEfectiva) entrega , MAX(NumeroFactura) fac 
	         from ComisionesSpigaVo co  			
			where EntregaEfectiva=1  --and vin ='9BWAB45U4MT008677'
			  and (ano_periodo = year(GETDATE()) or ano_periodo = year(GETDATE()-1)) 
		   group by Empresa, vin, gama) co on co.VIN = vo.vin
		                                      -- and co.Nit = vo.nit
											   and co.Empresa =vo.Empresa
											   and co.Gama = vo.Gama
											   and co.fac =vo.NumeroFactura
											   --JCS:18/03/2024 - SE BUSCAN LOS CENTROS VO (USADOS) Y BE (BELLPI) A DIFERENCIA COMO SE HACIA CON DEMOS
											   --and vo.centro NOT like 'VO-%' 
											   --and vo.Seccion LIKE '%vo%'
											   --and vo.Codigoempresa <> 24
											   AND (vo.centro LIKE 'VO-%' OR vo.centro LIKE 'BE-%')
											   AND vo.Seccion LIKE '%VO%'
                                               
		
 where co.entrega>0
 --  and a.Ano_Periodo = vo.Ano_Periodo   
   and vo.EntregaEfectiva >0
  -- and a.Ano_Periodo = 2024
   and (
        --JCS:19/03/2024 - CASO CT
        a.IdEmpresas = 1 
        and a.IdFacturaCargoAdicionalTipos in (1,19)
       )
       OR
       (
        --JCS:19/03/2024 - CASO BELLPI
        a.IdEmpresas = 24        
        and a.IdFacturaCargoAdicionalTipos in (2)
        )
   

```
