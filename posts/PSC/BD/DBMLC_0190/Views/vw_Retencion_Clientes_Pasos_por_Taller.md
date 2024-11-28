# View: vw_Retencion_Clientes_Pasos_por_Taller

## Usa los objetos:
- [[Empresas]]
- [[spiga_Empleados]]
- [[spiga_EntradasATaller]]
- [[spiga_Terceros]]
- [[spiga_VehiculosEntregados]]
- [[UnidadDeNegocio]]
- [[vw_TercerosCelularUltimaFechaActualizacion]]
- [[vw_TercerosCorreoUltimaFechaActualizacion]]
- [[vw_TercerosTelefonoFijoUltimaFechaActualizacion]]

```sql

 CREATE VIEW [dbo].[vw_Retencion_Clientes_Pasos_por_Taller] AS
select CodigoEmpresa,Empresa,CodigoCentro,Centro,CodUnidadNegocio,NombreUnidadNegocio,CodigoMarca,Marca,CodigoGama, 
Gama,NombreVendedor,FechaEntrada,VIN,NombreTercero,NifCif,email,fijo,celular 
from (
		select Orden=row_number() over (partition by vin, centro order by FechaEntrada desc),
		CodigoEmpresa,Empresa,CodigoCentro,Centro,CodUnidadNegocio,NombreUnidadNegocio,CodigoMarca,Marca,CodigoGama,Gama,
		NombreVendedor,FechaEntrada,VIN,NombreTercero,NifCif,email,fijo,celular 
		from (
				SELECT DISTINCT CodigoEmpresa,Empresa,CodigoCentro,Centro,CodUnidadNegocio,NombreUnidadNegocio,CodigoMarca,
				Marca,CodigoGama,Gama,NombreVendedor = g.Nombre+' '+g.Apellido1+' '+g.Apellido2,FechaEntrada,VIN,NombreTercero,          
				NifCif,email,fijo,Celular               
				from (
						SELECT DISTINCT CodigoEmpresa=IdEmpresas, Empresa=NombreEmpresa, CodigoCentro=IdCentros,Centro=NombreCentro,
						CodUnidadNegocio,NombreUnidadNegocio,CodigoMarca=IdMarcas,CodigoGama=IdGamas,Gama=NombreGama,FechaEntrada=FechaEntrada,
						VIN,FechaDeCorte,IdEmpleados,nombreTercero,NifCif,email,celular,Fijo,
						Marca =CASE WHEN Marca IS NULL THEN NombreUnidadNegocio ELSE Marca END
					   FROM (
							SELECT DISTINCT a.IdEmpresas,a.IdCentros,a.VIN,a.IdMarcas,a.NombreGama,a.FechaDeCorte,a.IdGamas,f.Marca,a.FechaEntrega,
							d.NombreEmpresa,a.FechaEntrada,b.NombreCentro,a.IdEmpleados,Fijo=e.Fijo,celular= e.celular,e.nombreTercero,e.NifCif,e.email,
							CodUnidadNegocio=CASE	WHEN b.NombreCentro LIKE 'FM-%'   THEN 4
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
							NombreUnidadNegocio  =CASE	WHEN b.NombreCentro LIKE 'DAI.V%' THEN 'Daimler PC'
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
						    --FROM [PSCService_DB].dbo.spiga_PasosPorTallerAsesores	a 
							FROM [PSCService_DB].dbo.spiga_EntradasATaller			a
						    LEFT JOIN (SELECT NombreCentro, codCentro FROM [DBMLC_0190].dbo.unidadDeNegocio)
																					b	ON  b.CodCentro=a.IdCentros
						    LEFT JOIN [DBMLC_0190].dbo.Empresas						d	ON a.IdEmpresas=d.CodigoEmpresa
						    LEFT JOIN (SELECT PkTerceros,email,celular,Fijo,nombreTercero, NifCif
									     FROM (SELECT PkTerceros,email,celular=Numero, Fijo, NifCif,
									           nombreTercero=isnull(convert(varchar,NombreComercial),convert(varchar,isnull(nombre,''))+' '+
																	convert(varchar,isnull(Apellido1,''))+' '+convert(varchar,isnull(Apellido2,'')))
									             FROM (SELECT orden=row_number() over (partition by nifcif order by fechamod desc), 
												       NifCif, PkTerceros, Nombre, NombreComercial, Apellido1, Apellido2
									                   FROM [PSCService_DB].dbo.spiga_Terceros)							a 
													LEFT JOIN (SELECT DISTINCT email, PkFkTerceros 
												              FROM vw_TercerosCorreoUltimaFechaActualizacion)			b ON a.PkTerceros=b.PkFkTerceros
													LEFT JOIN (SELECT DISTINCT Numero, PkFkTerceros 
												              FROM vw_TercerosCelularUltimaFechaActualizacion)			d ON a.PkTerceros=d.PkFkTerceros
													LEFT JOIN (SELECT DISTINCT fijo, PkFkTerceros   
												               FROM vw_TercerosTelefonoFijoUltimaFechaActualizacion)	e ON a.PkTerceros=e.PkFkTerceros
															   WHERE orden = 1 )	b)									e ON a.IdTerceros=e.PkTerceros
						    LEFT JOIN (SELECT DISTINCT CodigoMarca, Marca 
							             FROM [PSCService_DB].dbo.spiga_VehiculosEntregados)							f ON a.IdMarcas=f.CodigoMarca
							WHERE VIN IS NOT NULL AND VIN <>''
					--	                and vin like '%M164839%'
					)a	 
		)b
  LEFT JOIN (SELECT DISTINCT IdEmpleados, Nombre, Apellido1, Apellido2, DocVend=NifCif 
               FROM [PSCService_DB].dbo.spiga_Empleados) g ON b.IdEmpleados=g.IdEmpleados
	)c 
)d	where orden = 1

```
