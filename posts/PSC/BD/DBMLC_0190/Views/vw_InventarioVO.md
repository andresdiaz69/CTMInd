# View: vw_InventarioVO

## Usa los objetos:
- [[spiga_InventarioVO]]
- [[vw_UnidadDeNegocio]]

```sql
CREATE  view vw_InventarioVO as
SELECT Ano_Periodo, Mes_Periodo, IdEmpresas, Empresa,CodUnidadNegocio, NombreUnidadNegocio, IdCentros,  Centro,	Valor=SUM(Valor)
  FROM
	  (SELECT Ano_Periodo, Mes_Periodo, IdEmpresas, a.NombreEmpresa Empresa,
	          CodUnidadNegocio =  CASE when b.Sigla = 'MAY BYD' then 701
									   when b.Sigla = 'MAY MIT' then 700
									   when b.CodUnidadNegocio is null and IdCentros = 44  then 410
						     		   else b.CodUnidadNegocio END ,

			  NombreUnidadNegocio = CASE when b.Sigla = 'MAY BYD' then 'BYD Mayorista'
									     when b.Sigla = 'MAY MIT' then 'Mitsubishi Mayorista' 
										 when b.CodUnidadNegocio is null and IdCentros = 44  then 'JD AGRICOLA'
						 				 else b.NombreUnidadNegocio END , IdCentros,  
	          Centro,Valor = SUM(ISNULL(A.BaseImponibleCompra,0) + ISNULL(A.GastosAumentanStock,0))
		 FROM (SELECT Ano_Periodo, Mes_Periodo, IdEmpresas, a.NombreEmpresa ,IdCentros,IdSecciones,BaseImponibleCompra,GastosAumentanStock
		        FROM [PSCService_DB].[dbo].[spiga_InventarioVO] a WITH(NOLOCK)
			   -- WHERE Ano_Periodo = 2023 
				  --AND Mes_Periodo in (10,11,12)
			   where IdEmpresas IN (1, 5, 6, 19, 20, 24, 25, 27)
				--  AND IdSecciones NOT IN (1306, 1307, 1297)
		) A
		LEFT JOIN (
			SELECT DISTINCT CodUnidadNegocio,NombreUnidadNegocio,sigla, CodCentro,NombreCentro centro, CodSeccion FROM vw_UnidadDeNegocio 
		) B ON A.IdCentros = B.CodCentro AND A.IdSecciones = B.CodSeccion
		GROUP BY Ano_Periodo, Mes_Periodo, NombreEmpresa, A.IdEmpresas, B.CodUnidadNegocio,sigla, NombreUnidadNegocio,A.IdCentros,Centro,IdSecciones

		--UNION ALL

		--SELECT Ano_Periodo, Mes_Periodo, IdEmpresas, IdEmpresa = IdEmpresas,		IdLinea = CASE WHEN IdSecciones = 1297 THEN 'JD' 
		--													WHEN IdSecciones = 1306 THEN 'Mitsubishi Mayorista'
		--													ELSE 'BYD Mayorista' END,
		--	IdCentro=ISNULL(IdCentros,0),	Valor = SUM(ISNULL(BaseImponibleCompra,0) + ISNULL(GastosAumentanStock,0))
		--FROM [PSCService_DB].[dbo].[spiga_InventarioVO] WITH(NOLOCK)
		--WHERE Ano_Periodo = 2023 AND Mes_Periodo in (10,11,12)
		--	AND IdEmpresas IN (1, 5, 6, 19, 20, 24, 25, 27)		
		--	AND IdSecciones IN (1306, 1307, 1297)
		--GROUP BY Ano_Periodo, Mes_Periodo,IdEmpresas, IdCentros, IdSecciones
	) A
	--where ano_periodo = 2023
	--  and Mes_Periodo in (10,11,12)
	GROUP BY Ano_Periodo, Mes_Periodo, Empresa,A.IdEmpresas, CodUnidadNegocio, NombreUnidadNegocio,A.IdCentros,Centro
	
```
