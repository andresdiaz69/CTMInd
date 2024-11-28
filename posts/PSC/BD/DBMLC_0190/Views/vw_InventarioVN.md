# View: vw_InventarioVN

## Usa los objetos:
- [[spiga_InventarioVN]]
- [[vw_UnidadDeNegocio]]

```sql
CREATE  view vw_InventarioVN as

	
SELECT Ano_Periodo, Mes_Periodo, IdEmpresas, Empresa,CodUnidadNegocio, NombreUnidadNegocio, A.IdCentro,  Centro, sum(Valor)	Valor
  FROM (
		SELECT Ano_Periodo, Mes_Periodo, IdEmpresas, Empresa,CodUnidadNegocio, NombreUnidadNegocio,	A.IdCentro, 
		       Centro,IdSecciones,	Valor = SUM(BaseImponibleCompra + GastosAumentanStock)	
		  FROM (			    
			   SELECT Ano_Periodo, Mes_Periodo, a.IdEmpresas, a.NombreEmpresa	Empresa,Centro,IdSecciones,
			          CodUnidadNegocio =  CASE when b.Sigla = 'MAY BYD' then 701
									           when b.Sigla = 'MAY MIT' then 700
											   when b.CodUnidadNegocio is null and IdCentros = 44  then 410
						     				   else b.CodUnidadNegocio END ,

				      NombreUnidadNegocio = CASE when b.Sigla = 'MAY BYD' then 'BYD Mayorista'
									             when b.Sigla = 'MAY MIT' then 'Mitsubishi Mayorista' 
												 when b.CodUnidadNegocio is null and IdCentros = 44  then 'JD AGRICOLA'
						 				         else b.NombreUnidadNegocio END ,

			  	     IdCentro=ISNULL(a.IdCentros,0),	BaseImponibleCompra=ISNULL(A.BaseImponibleCompra,0),
			  	     GastosAumentanStock=ISNULL(A.GastosAumentanStock,0)
			    FROM (
			  	      SELECT * 
	                    FROM [PSCService_DB].[dbo].[spiga_InventarioVN] WITH(NOLOCK)
	                   WHERE IdCompraEstados <> 'F' 
					     AND IdEmpresas IN (1, 5, 6, 19, 20, 24, 25, 27)
			  	         and FechaFactura >= '20130101' 
			  		     --AND LTRIM(RTRIM(NombreCentro)) LIKE 'JD-%'
			          ) A
			    LEFT JOIN (SELECT CodUnidadNegocio,NombreUnidadNegocio, CodCentro,NombreCentro centro, Sigla,CodSeccion FROM vw_UnidadDeNegocio 
			              ) B ON A.IdCentros = B.CodCentro AND A.IdSecciones = B.CodSeccion			 
			
		
		      )A GROUP BY Ano_Periodo, Mes_Periodo, IdEmpresas, Empresa,CodUnidadNegocio, NombreUnidadNegocio,	A.IdCentro,IdSecciones, Centro
	   ) a
 --where Ano_Periodo = 2023
 --  and Mes_Periodo in (10,11,12)
 GROUP BY Ano_Periodo, Mes_Periodo, IdEmpresas, Empresa,CodUnidadNegocio, NombreUnidadNegocio,	A.IdCentro, Centro

```
