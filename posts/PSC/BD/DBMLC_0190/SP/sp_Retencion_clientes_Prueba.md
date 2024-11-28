# Stored Procedure: sp_Retencion_clientes_Prueba

## Usa los objetos:
- [[Empresas]]
- [[spiga_Empleados]]
- [[spiga_PasosPorTallerAsesores]]
- [[spiga_Terceros]]
- [[spiga_VehiculosEntregados]]
- [[UnidadDeNegocio]]
- [[vw_TercerosCelularUltimaFechaActualizacion]]
- [[vw_TercerosCorreoUltimaFechaActualizacion]]
- [[vw_TercerosTelefonoFijoUltimaFechaActualizacion]]

```sql
--DROP VIEW vw_Retencion_Clientes_Pasos_por_Taller
-- ALTER VIEW [dbo].[vw_Retencion_Clientes_Pasos_por_Taller] AS

CREATE procedure sp_Retencion_clientes_Prueba 

 @fecha date
AS
BEGIN
	

select CodigoEmpresa,  Empresa,          CodigoCentro, 
       Centro,         CodUnidadNegocio, NombreUnidadNegocio, 
	   CodigoMarca,    Marca,            CodigoGama, 
       Gama,  Tipo='',         NombreVendedor,  Cantidad=0, Valor=0,FechaEntrada, 
	   VIN ,           Antiguedad,       NombreTercero,
	   NifCif,         email,            fijo, 
	   celular ,fechaMenosUnMeshoy
  from (select Orden=row_number() over (partition by vin, centro order by FechaEntrada desc),
		       CodigoEmpresa,       Empresa,      CodigoCentro, Centro,        CodUnidadNegocio, 
			   NombreUnidadNegocio, CodigoMarca,  Marca,        CodigoGama,    Gama,
			   NombreVendedor,      FechaEntrada, VIN ,         Antiguedad,    NombreTercero, 
			   NifCif,              email,        fijo,         celular ,fechaMenosUnMeshoy
		 from (SELECT DISTINCT CodigoEmpresa, Empresa,           CodigoCentro, 
		              Centro,                 CodUnidadNegocio,  NombreUnidadNegocio, 
					  CodigoMarca,            Marca,             CodigoGama,  
					  Gama,                   NombreVendedor =   g.Nombre+' '+g.Apellido1+' '+g.Apellido2, 
					  FechaEntrada,           VIN,               NombreTercero,          
					  NifCif,                 email,             fijo, 
					  celular ,               Antiguedad= CASE WHEN Antiguedad1 BETWEEN 0  AND 11 THEN 'UnAño' 
					                                           WHEN Antiguedad1 BETWEEN 12 AND 23 THEN 'DosAños' 
															   WHEN Antiguedad1 > 23              THEN 'MasAntiguos' 
															    END,fechaMenosUnMeshoy
				FROM (SELECT DISTINCT CodigoEmpresa=IdEmpresas, Empresa=NombreEmpresa, CodigoCentro=IdCentros, 
				             Centro=NombreCentro,               CodUnidadNegocio,      NombreUnidadNegocio, 
							 CodigoMarca=IdMarcas ,             CodigoGama=IdGamas,    Gama=NombreGama,       
							 FechaEntrada=FechaEntrada,         VIN,                   FechaDeCorte,    
							 IdEmpleados,   			        nombreTercero,         NifCif,
							 email,                             celular,               Fijo	, 
							 Antiguedad1=DATEDIFF(MONTH,  FechaEntrada,fechaMenosUnMeshoy),
							 Marca =CASE WHEN Marca IS NULL THEN NombreUnidadNegocio 
							                                ELSE Marca END,fechaMenosUnMeshoy
					   FROM (SELECT DISTINCT a.IdEmpresas,   a.IdCentros, 
					                a.VIN,                   a.IdMarcas, 
									a.NombreGama,            a.FechaDeCorte,
									a.IdGamas,               f.Marca, 
									a.FechaEntrega,          d.NombreEmpresa, 
									a.FechaEntrada,          b.NombreCentro, 
									a.IdEmpleados,           fechaMenosUnMeshoy=EOMONTH (@fecha, -1 ),
									--,nombreVendedor=g.nombre+' '+g.Apellido1+' '+g.Apellido2  
						            Fijo=e.Fijo,             celular= e.celular, 
									e.nombreTercero,         e.NifCif, 
									e.email,                 CodUnidadNegocio=CASE WHEN b.NombreCentro LIKE 'FM-%'   THEN 4
						                                                           WHEN b.NombreCentro LIKE 'DAI.C%' THEN 1   
																				   WHEN b.NombreCentro LIKE 'DAI.V%' THEN 3  
																				   WHEN b.NombreCentro LIKE 'FR-%'   THEN 12 
																				   WHEN b.NombreCentro LIKE 'MIT-%'  THEN 20
						                                                           WHEN b.NombreCentro LIKE 'MZ-%'   THEN 22 
																				   WHEN b.NombreCentro LIKE 'RN-%'   THEN 19
																				   WHEN b.NombreCentro LIKE 'VO-%'   THEN 7  
																				   WHEN b.NombreCentro LIKE 'VW-%'   THEN 2
						                                                           WHEN b.NombreCentro LIKE 'USC-%'  THEN 4   
																				   WHEN b.NombreCentro LIKE 'CO-%'   THEN 5  
																				   WHEN b.NombreCentro LIKE 'BN-%'   THEN 417 
																				   WHEN b.NombreCentro LIKE 'BYD%'   THEN 245
						                                                           WHEN b.NombreCentro LIKE 'bell%'  THEN 23  
																				   WHEN b.NombreCentro LIKE 'BE-%'   THEN 23 
																				   WHEN b.NombreCentro LIKE 'JD%'    THEN 410 END ,
						           NombreUnidadNegocio  =CASE WHEN b.NombreCentro LIKE 'DAI.V%' THEN 'Daimler PC'
						                                      WHEN b.NombreCentro LIKE 'DAI.C%' THEN 'Daimler VC' 
															  WHEN b.NombreCentro LIKE 'FR-%'   THEN 'Ford'     
															  WHEN b.NombreCentro LIKE 'MIT-%'  THEN 'Mitsubishi' 
															  WHEN b.NombreCentro LIKE 'MZ-%'   THEN 'Mazda'    
						                                      WHEN b.NombreCentro LIKE 'RN-%'   THEN 'Renault'   
															  WHEN b.NombreCentro LIKE 'VO-%'   THEN 'Usados'   
															  WHEN b.NombreCentro LIKE 'VW-%'   THEN 'Volkswagen' 
															  WHEN b.NombreCentro LIKE 'USC-%'  THEN 'USC (Unidad de Servicios compartidos)'
						                                      WHEN b.NombreCentro LIKE 'CO-%'   THEN 'Colisión'  
															  WHEN b.NombreCentro LIKE 'BN-%'   THEN 'Bonaparte' 
															  WHEN b.NombreCentro LIKE 'BYD%'   THEN 'BYD'        
															  WHEN b.NombreCentro LIKE 'bell%'  THEN 'BELLPI'
						                                      WHEN b.NombreCentro LIKE 'BE-%'   THEN 'BELLPI'    
															  WHEN b.NombreCentro LIKE 'JD%'    THEN 'John Deere' END  
						    FROM [PSCService_DB].dbo.spiga_PasosPorTallerAsesores a 
						    LEFT JOIN (SELECT NombreCentro, codCentro FROM [DBMLC_0190].dbo.unidadDeNegocio)b ON  b.CodCentro=a.IdCentros
						    LEFT JOIN [DBMLC_0190].dbo.Empresas d                                             ON a.IdEmpresas=d.CodigoEmpresa
						    LEFT JOIN (SELECT PkTerceros,    email, 
							                  celular,       Fijo, 
											  nombreTercero, NifCif
									     FROM (SELECT PkTerceros ,   email, 
										              celular=Numero, Fijo, NifCif,
									                  nombreTercero=isnull(convert(varchar,NombreComercial),convert(varchar,isnull(nombre,''))+' '+convert(varchar,isnull(Apellido1,''))+' '+convert(varchar,isnull(Apellido2,'')))
									             FROM (SELECT orden=row_number() over (partition by nifcif order by fechamod desc), 
												              NifCif, PkTerceros, Nombre, NombreComercial, Apellido1, Apellido2
									                     FROM [PSCService_DB].dbo.spiga_Terceros)a 
									             LEFT JOIN (SELECT DISTINCT email, PkFkTerceros 
												              FROM vw_TercerosCorreoUltimaFechaActualizacion)       b ON a.PkTerceros=b.PkFkTerceros
									             LEFT JOIN (SELECT DISTINCT Numero, PkFkTerceros 
												              FROM vw_TercerosCelularUltimaFechaActualizacion)      d ON a.PkTerceros=d.PkFkTerceros
									             LEFT JOIN (SELECT DISTINCT fijo, PkFkTerceros   
												              FROM vw_TercerosTelefonoFijoUltimaFechaActualizacion) e ON a.PkTerceros=e.PkFkTerceros
									    WHERE orden = 1 )b) e ON a.IdTercerosPropietario=e.PkTerceros
						    LEFT JOIN (SELECT DISTINCT CodigoMarca, Marca 
							             FROM [PSCService_DB].dbo.spiga_VehiculosEntregados) f ON a.IdMarcas=f.CodigoMarca
		 
						                WHERE VIN IS NOT NULL 
										  AND VIN <>''
						                --and vin like '%M164839%'
					                   )a	 
				            )b
  LEFT JOIN (SELECT DISTINCT IdEmpleados, Nombre, Apellido1, Apellido2, DocVend=NifCif 
               FROM [PSCService_DB].dbo.spiga_Empleados) g ON b.IdEmpleados=g.IdEmpleados
	)c 
 )d	where orden = 1
 --and vin in ('YV1DZ40CDF2695441','00000000000023820')

--GO

union all

--DROP VIEW vw_Retencion_Clientes_Vehi_Entregados 
--ALTER VIEW [dbo].[vw_Retencion_Clientes_Vehi_Entregados] AS 
select CodigoEmpresa, Empresa, CodigoCentro, Centro, CodUnidadNegocio, NombreUnidadNegocio, CodigoMarca, Marca, CodigoGama, 
Gama, tipo, NombreVendedor, Cantidad, Valor, FechaEntregaCliente, VIN, Antiguedad,NombreTercero, Nit, email, fijo, celular,fechaMenosUnMeshoy
from(
	select Orden=row_number() over (partition by vin order by FechaEntregaCliente desc),
	CodigoEmpresa, Empresa, CodigoCentro, Centro, CodUnidadNegocio, NombreUnidadNegocio, CodigoMarca, Marca, CodigoGama, 
	Gama, tipo, NombreVendedor, Cantidad, Valor, FechaEntregaCliente, VIN, Antiguedad,NombreTercero, Nit, email, fijo, celular,fechaMenosUnMeshoy
	from(
		SELECT DISTINCT CodigoEmpresa, Empresa, CodigoCentro, Centro, CodUnidadNegocio, NombreUnidadNegocio, CodigoMarca, Marca, CodigoGama
				  , Gama, tipo, NombreVendedor, Cantidad, Valor, FechaEntregaCliente, VIN 
				  , Antiguedad= CASE
				  WHEN Antiguedad1 BETWEEN 0 AND 11  THEN 'UnAño'    WHEN Antiguedad1 BETWEEN 12 AND 23 THEN 'DosAños'   
				  WHEN Antiguedad1 BETWEEN 24 AND 35 THEN 'TresAños' WHEN Antiguedad1 BETWEEN 36 AND 47 THEN 'CuatroAños' 
				  WHEN Antiguedad1 > 47              THEN 'MasAntiguos'END
				  , NombreTercero, Nit, email, fijo, celular,fechaMenosUnMeshoy
		FROM(
			 SELECT CodigoEmpresa, Empresa, CodigoCentro, Centro, CodUnidadNegocio, NombreUnidadNegocio, CodigoMarca, Marca, CodigoGama
			 , Gama, tipo, NombreVendedor, Cantidad, Valor, FechaEntregaCliente, VIN, FechaDCorte, NombreTercero, Nit, b.email, b.Fijo, b.celular
			 , Antiguedad1=DATEDIFF(MONTH,FechaEntregaCliente,fechaMenosUnMeshoy) ,fechaMenosUnMeshoy
			 FROM (
				   SELECT DISTINCT a.CodigoEmpresa, a.Empresa, CodigoCentro, a.Centro, c.CodUnidadNegocio
				   , NombreUnidadNegocio = CASE WHEN a.Centro LIKE 'JD%' THEN 'John Deere' ELSE c.NombreUnidadNegocio END 	
				   , a.Marca, a.Gama, a.NombreTercero, a.NombreVendedor, a.Nit, a.Cantidad, a.Valor, a.FechaEntregaCliente
				   , VIN, FechaDCorte=CONVERT(DATE,a.FechaDeCorte), CodigoGama, CodigoMarca, a.tipo, fechaMenosUnMeshoy=EOMONTH (@fecha, -1 )  
				   FROM [PSCService_DB].dbo.spiga_VehiculosEntregados a  
				   LEFT JOIN [DBMLC_0190].dbo.UnidadDeNegocio c ON a.CodigoEmpresa=c.CodEmpresa AND a.CodigoCentro=c.CodCentro AND a.CodigoSeccion=c.CodSeccion
				   WHERE a.Cantidad=1 AND VIN IS NOT NULL AND VIN <>'' AND YEAR(FechaDeCorte)>= 2010
				   --and vin  in('1T0410LXVFC279404','WF0CP6A94H1C43115')
					)a
			 LEFT JOIN (SELECT NifCif , email, celular, Fijo
						FROM(SELECT NifCif , email, celular=Numero, Fijo
						FROM(SELECT orden=row_number() over (partition by nifcif order by fechamod desc), NifCif, PkTerceros
						FROM [PSCService_DB].dbo.spiga_Terceros )a 
						 LEFT JOIN (SELECT DISTINCT email, PkFkTerceros  FROM vw_TercerosCorreoUltimaFechaActualizacion)       b ON a.PkTerceros=b.PkFkTerceros
						 LEFT JOIN (SELECT DISTINCT Numero, PkFkTerceros FROM vw_TercerosCelularUltimaFechaActualizacion)      d ON a.PkTerceros=d.PkFkTerceros
						 LEFT JOIN (SELECT DISTINCT fijo, PkFkTerceros   FROM vw_TercerosTelefonoFijoUltimaFechaActualizacion) e ON a.PkTerceros=e.PkFkTerceros
						 WHERE orden = 1)b) b ON a.Nit=b.NifCif 	 
						-- and vin ='JM7KF2W7AM0606795'
		 )c where Antiguedad1 > 0
	)d 
)e  where orden = 1
--and vin in ('YV1DZ40CDF2695441','00000000000023820')
end

```
