# View: vw_Clientes_nuevos_por_marca

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[ComisionesSpigaTallerPorOT]]
- [[ComisionesSpigaVN]]
- [[ComisionesSpigaVO]]
- [[vw_Terceros_Consolidado]]

```sql
CREATE VIEW [dbo].[vw_Clientes_nuevos_por_marca] AS
--MS: 050923 -- se remplaza la tabla de terceros SpigaFichaLlamadaAgendamientoDatosTerceroFechaAlta por la vista vw_Terceros_Consolidado
SELECT YEAR(Fecha_Alta)  Ano1,  MONTH(Fecha_Alta)  Mes1,  Modulo,     CodigoTerceroSpiga, 
       TipoDocumento =case FkDocumentacionTipos when 1 then 'NIT' 
			                                    when 2 then 'CEDULA'
												when 3 then 'Tarjeta Extranjería'
												when 4 then 'Pasaporte'
												when 5 then 'RUT'
												when 6 then 'Tarjeta Identidad'
												when 7 then 'Cédula de Extranjería'end,           
	   Cedula_Nit,             Nombre,          Apellido1,
	   Apellido2,              Celular,         Fijo,        Direccion,
	   Poblacion,              Email,           Fecha_Alta FechaAlta, CASE WHEN marca = 'BN' THEN 'BONAPARTE' 
				                                                           WHEN marca = 'DAI.C' THEN 'DAIMLER COMERCIAL'
																		   WHEN marca = 'DAI.V' THEN 'DAIMLER VEHICULOS'
																		   WHEN marca = 'FR' THEN 'FORD' WHEN marca = 'JD' 																				 THEN 'JOHN DEERE' 
																		   WHEN marca = 'MIT' THEN 'MITSUBISHI' 
																		   WHEN marca = 'Operaciones Cerradas' THEN 'MITSUBISHI'
																		   WHEN marca = 'MZ' THEN 'MAZDA' WHEN marca = 'RN' THEN 'RENAULT'
																		   WHEN marca = 'VW' THEN 'VOLKSWAGEN' 
																		   WHEN marca = 'CO' THEN 'COLISION' 
																		   WHEN marca = 'IR' THEN 'ISARIEGO' 
																		   WHEN marca = 'USC CT' THEN 'USC' 
																		   WHEN marca = 'USC' THEN 'USC' 
																		   WHEN Marca = 'VO' THEN 'USADOS' 
																		   ELSE Marca END AS Marca

  FROM (SELECT DISTINCT t.PkTerceros  CodigoTerceroSpiga,   FkDocumentacionTipos,     t.NifCif  Cedula_Nit,
               t.Nombre,                                    t.Apellido1,              t.Apellido2, 
			   t.Celular1 celular,                          t.TelPrincipal fijo,      t.Direccion_Principal Direccion,
			   t.ciudadPrincipal poblacion,                 t.email_principal email, -- t.CategoriaCliente,
			   t.Fecha_Alta,                                CASE WHEN v.Marca = 'VOLKSWAGEN COMERCIALES'  THEN 'VOLKSWAGEN' 
			                                                     WHEN v.Marca = 'MITSUBISHI-FUSO' THEN 'DAIMLER COMERCIAL' 
																 WHEN v.Marca = 'Freightliner' THEN 'DAIMLER COMERCIAL'
																 WHEN v.Marca = 'Mitsubishi' THEN 'MITSUBISHI' 
																 WHEN v.Marca = 'Ford' THEN 'FORD' 
																 WHEN v.Marca = 'Renault' THEN 'RENAULT'
																 WHEN V.Marca = 'Volkswagen' THEN 'VOLKSWAGEN'
																 WHEN V.Marca = 'Mazda' THEN 'MAZDA' 
																 WHEN V.Marca = 'Mercedes Trucks' THEN 'DAIMLER COMERCIAL'
																 WHEN V.Marca = 'Mercedes Ligeros ' THEN 'DAIMLER COMERCIAL'
																 WHEN V.Marca = 'Mercedes Vans' THEN 'DAIMLER COMERCIAL'
																 WHEN V.Marca = 'Implementos' THEN 'JOHN DEERE'
																 WHEN V.Marca = 'John Deere Agrícola' THEN 'JOHN DEERE'
																 WHEN v.Marca = 'Mercedes-Benz' THEN 'DAIMLER VEHICULOS' 
																 WHEN v.Marca = 'John Deere Construccion' THEN 'JOHN DEERE'
																 WHEN v.Marca = 'John Deere Golf & Turf' THEN 'JOHN DEERE' 
																 else marca end as marca, 'VN' AS Modulo
		  FROM dbo.vw_Terceros_Consolidado          t 
		  LEFT OUTER JOIN dbo.ComisionesSpigaVN     v ON t.NifCif          = v.Nit 
		                                            AND YEAR(t.Fecha_Alta) = YEAR(v.FechaFactura) 
													AND MONTH(t.Fecha_Alta) = MONTH(v.FechaFactura)--MS:050923 --se corrige el filtro 
		 WHERE (t.NifCif IS NOT NULL) 
		   AND (v.CodigoMArca IS NOT NULL)					
		 UNION ALL

		SELECT DISTINCT t.PkTerceros AS CodigoTerceroSpiga,  t.FkDocumentacionTipos,  t.NifCif AS Cedula_Nit, 
		       t.Nombre,                                     t.Apellido1,             t.Apellido2,
			   t.Celular1 Celular,                           t.TelPrincipal fijo,     t.Direccion_Principal direccion, 
			   t.ciudadPrincipal Poblacion,                  t.email_principal email, --t.CategoriaCliente, 
			   t.Fecha_Alta,                                 Marca = 'USADOS', 'VO' AS Modulo
          FROM dbo.vw_Terceros_Consolidado         t 
		  LEFT OUTER JOIN dbo.ComisionesSpigaVO    v ON t.NifCif = v.Nit 
		                                            AND YEAR(t.Fecha_Alta) = YEAR(v.FechaFactura) 
													AND MONTH(t.Fecha_Alta) = MONTH(v.FechaFactura)--MS:050923 --se corrige el filtro 
         WHERE (t.NifCif IS NOT NULL) 
		   AND (v.CodigoMArca IS NOT NULL)
         UNION ALL
                          
		SELECT t.PkTerceros AS CodigoTerceroSpiga,  t.FkDocumentacionTipos,       t.NifCif AS Cedula_Nit,    t.Nombre,
		       t.Apellido1,                         t.Apellido2,                  t.Celular1 Celular,  	     t.TelPrincipal fijo, 
			   t.Direccion_Principal Direccion,     t.ciudadPrincipal Poblacion,  t.email_principal email,   --CategoriaCliente,
			   t.Fecha_Alta,                        SiglaMarca,                   'TA' AS Modulo
		 FROM (SELECT DISTINCT centro, CASE WHEN CHARINDEX('-', Centro) = 0 THEN Centro
		                                    ELSE LEFT(Centro, CHARINDEX('-', Centro) - 1) END AS SiglaMarca, 
					  NitCliente,      FechaFactura, Marcaveh, CategoriaCliente
				 FROM dbo.ComisionesSpigaTallerPorOT 
			  )AS v
		 LEFT OUTER JOIN dbo.vw_Terceros_Consolidado    t ON t.NifCif = v.NitCliente
		                                                 AND YEAR(t.Fecha_Alta) = YEAR(v.FechaFactura) 
											  		     AND MONTH(t.Fecha_Alta) = MONTH(v.FechaFactura)--MS:050923 --se corrige el filtro 
		WHERE (t.NifCif IS NOT NULL) 
		  AND (v.Marcaveh IS NOT NULL) 
		 -- and NifCif = '4406727'
        UNION ALL

	   SELECT t.PkTerceros AS CodigoTerceroSpiga,  t.FkDocumentacionTipos,       t.NifCif AS Cedula_Nit,    t.Nombre,
		      t.Apellido1,                         t.Apellido2,                  t.Celular1 Celular,  	    t.TelPrincipal fijo, 
			  t.Direccion_Principal Direccion,     t.ciudadPrincipal Poblacion,  t.email_principal email,   --CategoriaCliente,
			  t.Fecha_Alta,                        SiglaMarca, 'RE' AS Modulo
         FROM (SELECT DISTINCT Ano_Spiga,  Mes_Spiga,
		             Centro, CASE WHEN CHARINDEX('-', Centro) = 0 THEN Centro 
								  ELSE LEFT(Centro, CHARINDEX('-', Centro) - 1) END AS SiglaMarca, 
					 Nitcliente,  CategoriaCliente
                FROM dbo.ComisionesSpigaAlmacenAlbaran
			  )AS a 
		 LEFT OUTER JOIN dbo.vw_Terceros_Consolidado AS t ON t.NifCif = a.Nitcliente 
		                                                 AND YEAR(t.Fecha_Alta) = a.Ano_Spiga
														 AND MONTH(t.Fecha_Alta) = a.Mes_Spiga
        WHERE (t.NifCif IS NOT NULL)
		
	 ) AS d
where YEAR(Fecha_Alta)   = 2023
--and Cedula_Nit = '4406727'

```
