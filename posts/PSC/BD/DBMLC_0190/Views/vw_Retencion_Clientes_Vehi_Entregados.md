# View: vw_Retencion_Clientes_Vehi_Entregados

## Usa los objetos:
- [[spiga_Terceros]]
- [[spiga_VehiculosEntregados]]
- [[UnidadDeNegocio]]
- [[vw_TercerosCelularUltimaFechaActualizacion]]
- [[vw_TercerosCorreoUltimaFechaActualizacion]]
- [[vw_TercerosTelefonoFijoUltimaFechaActualizacion]]

```sql
--DROP VIEW vw_Retencion_Clientes_Vehi_Entregados 
CREATE VIEW [dbo].[vw_Retencion_Clientes_Vehi_Entregados] AS 
select CodigoEmpresa,    Empresa,        CodigoCentro,     Centro, CodUnidadNegocio, NombreUnidadNegocio, 
CodigoMarca,      Marca,   CodigoGama,       Gama,   tipo,             NombreVendedor,    Cantidad,         FechaEntregaCliente,
Valor,            VIN, 	 NombreTercero,   Nit,   email,	   fijo,             celular
from (
		select Orden=row_number() over (partition by vin order by FechaEntregaCliente desc),
	    CodigoEmpresa,Empresa, CodigoCentro,     Centro, CodUnidadNegocio, NombreUnidadNegocio, CodigoMarca, Marca, CodigoGama,Gama, 
		tipo,NombreVendedor, Cantidad,FechaEntregaCliente,Valor,VIN,NombreTercero,Nit,email, fijo,celular
	    from (
				SELECT DISTINCT CodigoEmpresa,Empresa,CodigoCentro,Centro, CodUnidadNegocio,NombreUnidadNegocio,CodigoMarca,Marca, 
				CodigoGama,Gama,tipo,NombreVendedor,Cantidad,Valor,FechaEntregaCliente,VIN,NombreTercero,Nit,email,fijo,celular
				from (
						SELECT CodigoEmpresa,Empresa,CodigoCentro,Centro,CodUnidadNegocio,NombreUnidadNegocio,CodigoMarca,Marca, 
						CodigoGama,Gama,tipo,NombreVendedor,Cantidad,FechaEntregaCliente,Valor,VIN,FechaDCorte,NombreTercero,
						Nit,b.email,b.Fijo,b.celular
			            from(
							SELECT DISTINCT a.CodigoEmpresa,a.Empresa, 
							CodigoCentro = case when a.Centro like 'VO%' then '999' else a.CodigoCentro end,              
							Centro       = case when a.Centro like 'VO%' then 'Bonaparte' else a.Centro end, 
							CodUnidadNegocio = case when a.centro like 'VO%'  then '417' else c.CodUnidadNegocio end,       
							NombreUnidadNegocio = CASE WHEN a.Centro LIKE 'JD%'  THEN 'John Deere' 
									                   WHEN a.Centro LIKE 'VO%'  THEN 'Bonaparte' 
									               ELSE c.NombreUnidadNegocio END ,	
				            a.Marca,a.Gama,a.NombreTercero,a.NombreVendedor,a.Nit,a.Cantidad,a.Valor, a.FechaEntregaCliente,
				            VIN,FechaDCorte=CONVERT(DATE,a.FechaDeCorte),CodigoGama,CodigoMarca,a.tipo
				            FROM [PSCService_DB].dbo.spiga_VehiculosEntregados a  
				            LEFT JOIN [DBMLC_0190].dbo.UnidadDeNegocio c	ON a.CodigoEmpresa  = c.CodEmpresa 
				                                                            AND a.CodigoCentro   = c.CodCentro 
															                AND a.CodigoSeccion  = c.CodSeccion
				            WHERE a.Cantidad = 1 
							AND VIN IS NOT NULL AND VIN <>'' 
							AND YEAR(FechaDeCorte)>= 2010
				         )a	LEFT JOIN (SELECT NifCif , email,celular, Fijo
										FROM (SELECT NifCif,email,celular=Numero, Fijo
						                    FROM (SELECT orden=row_number() over (partition by nifcif order by fechamod desc), 
											      NifCif, PkTerceros
						                          FROM [PSCService_DB].dbo.spiga_Terceros)	a 
						            LEFT JOIN (SELECT DISTINCT email, PkFkTerceros  
									             FROM vw_TercerosCorreoUltimaFechaActualizacion)       b ON a.PkTerceros=b.PkFkTerceros
						            LEFT JOIN (SELECT DISTINCT Numero, PkFkTerceros 
									             FROM vw_TercerosCelularUltimaFechaActualizacion)      d ON a.PkTerceros=d.PkFkTerceros
						            LEFT JOIN (SELECT DISTINCT fijo, PkFkTerceros   
									             FROM vw_TercerosTelefonoFijoUltimaFechaActualizacion) e ON a.PkTerceros=e.PkFkTerceros
						                        WHERE orden = 1)b) b ON a.Nit=b.NifCif 	 
						                       -- and vin ='JM7KF2W7AM0606795'
		                    )c 
	)d 
)e where orden = 1


```
