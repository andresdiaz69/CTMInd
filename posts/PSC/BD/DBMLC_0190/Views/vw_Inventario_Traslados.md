# View: vw_Inventario_Traslados

## Usa los objetos:
- [[Empresas]]
- [[spiga_TrasladosDeRepuestosPendientes]]
- [[vw_UnidadDeNegocio]]

```sql

CREATE view [dbo].[vw_Inventario_Traslados]  as
 SELECT Ano_Periodo,		Mes_Periodo,	idEmpresas_Entrada,
 		IdCentros,	        IdSecciones,	nombreseccion,
		NombreCentro,       NombreEmpresa,
 		codunidadnegocio    =  codigomarca ,
		NombreUnidadNegocio= nombremarca , 		
 		valormediomovimiento = SUM(valormediomovimiento)
   FROM ( SELECT Ano_Periodo,		Mes_Periodo,			IdEmpresas_Entrada,
                 IdCentros,	        IdSecciones,
				 codigomarca  = case WHEN nombremarca = 'MAYORISTA VEHICULOS' and Sigla = 'MAY BYD' THEN 701
								     WHEN nombremarca = 'MAYORISTA VEHICULOS' and Sigla = 'MAY MIT' THEN 700
								     else codigomarca end,
	          	 nombremarca  = CASE WHEN nombremarca = 'MAYORISTA VEHICULOS' and Sigla = 'MAY MIT' THEN 'Mitsubishi mayorista'
		       					     WHEN nombremarca = 'MAYORISTA VEHICULOS' and Sigla = 'MAY BYD' THEN 'BYD mayorista'
								     else nombremarca end,
                 		valormediomovimiento,	CodSeccion,
                 nombreseccion,		NombreCentro,           NombreEmpresa, sigla
           FROM (SELECT Ano_Periodo,		Mes_Periodo,		nombremarca,
                        CodSeccion,		    IdEmpresas_Entrada, NombreEmpresa,
                        ValorMedioMovimiento=SUM([ValorBruto]),
						IdCentros = case when IdEmpresas_Entrada ='1' and IdCentros_Entrada='146' and IdSecciones_Entrada ='878' then '147'
			                                     when IdEmpresas_Entrada ='1' and IdCentros_Entrada='146' and IdSecciones_Entrada ='889' then '2'
							                     else IdCentros_Entrada end,
			            IdSecciones = case when IdEmpresas_Entrada ='1' and IdCentros_Entrada='146' and IdSecciones_Entrada ='878' then '705'
			                               when IdEmpresas_Entrada ='1' and IdCentros_Entrada='146' and IdSecciones_Entrada ='889' then '10'
							               else IdSecciones_Entrada end,
			            NombreCentro = case when IdEmpresas_Entrada ='1' and IdCentros_Entrada='146' and IdSecciones_Entrada ='878' then 'FR-Bta.-AV 68'
			                                when IdEmpresas_Entrada ='1' and IdCentros_Entrada='146' and IdSecciones_Entrada ='889' then 'MZ-Bta-Cra.30'
							                else NombreCentro end,
			            NombreSeccion = case when IdEmpresas_Entrada ='1' and IdCentros_Entrada='146' and IdSecciones_Entrada ='878' then 'Mesa de repuestos FR Av 68'
			                                 when IdEmpresas_Entrada ='1' and IdCentros_Entrada='146' and IdSecciones_Entrada ='889' then 'Bodega MZ Carrera 30'
							                 else NombreSeccion end,
                        CASE WHEN NombreMarca='JD Agricola'		THEN 410
                             WHEN NombreMarca='Wirtgen'			THEN 520
                             WHEN NombreMarca='JD Construccion'	THEN 411
							 else CodUnidadNegocio
                              END CodigoMarca, sigla
                   FROM (SELECT Ano_Periodo,		Mes_Periodo,			IdEmpresas_Entrada,
                                IdCentros_Entrada,  IdSecciones_Entrada,	MR,
                                Referencia,		    ValorBruto,				b.CodSeccion,
                                b.nombreseccion,	b.Nombrecentro,         CodUnidadNegocio,
		                        CASE WHEN a.MR IN ('BEN','CIB','HAM','KLE','VOG','WIR') THEN 'Wirtgen'
                                     ELSE b.nombreunidadnegocio
                                      END NombreMarca, c.NombreEmpresa 		,sigla
                           FROM [PSCService_DB].[dbo].[spiga_TrasladosDeRepuestosPendientes] a

                           LEFT JOIN (SELECT CodSeccion,   nombreseccion,    nombreunidadnegocio,
											 nombrecentro, CodUnidadNegocio, CodCentro,
											 CodEmpresa ,sigla
                                               FROM DBMLC_0190.dbo.vw_UnidadDeNegocio
			                          ) b	ON a.IdSecciones_Entrada = b.CodSeccion
										   AND a.IdCentros_Entrada=b.CodCentro
				                           AND a.IdEmpresas_Entrada = b.CodEmpresa
						   LEFT JOIN	DBMLC_0190..Empresas (nolock)c ON c.CodigoEmpresa = a.IdEmpresas_Entrada 
		                                                              AND c.CodigoEmpresa = b.CodEmpresa
                         -- WHERE idcentros_Entrada IN (21,25,124,22,65,46,18,16,49,44,29,149,41,26,43,23)
					     )a

			    GROUP BY Ano_Periodo,		    Mes_Periodo,			IdEmpresas_Entrada,
			    		 IdCentros_Entrada,	    IdSecciones_Entrada,	nombremarca,
			    		 CodSeccion,		    nombreseccion,			NombreCentro,
						 CodUnidadNegocio,      NombreEmpresa,          sigla)b
			 )a
--where Ano_Periodo = 2024
--  and Mes_Periodo = 4
--  and codigomarca in (700,701)
   GROUP BY Ano_Periodo,		Mes_Periodo,			IdEmpresas_Entrada,
       		IdCentros,	        IdSecciones,	        nombremarca,
       		codigomarca,		NombreCentro,           nombreseccion,
			NombreEmpresa
	  

```
