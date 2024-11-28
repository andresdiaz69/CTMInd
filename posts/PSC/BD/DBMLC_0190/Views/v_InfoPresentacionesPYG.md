# View: v_InfoPresentacionesPYG

## Usa los objetos:
- [[InformesDefinitivos]]
- [[InformesPresentaciones]]

```sql
CREATE VIEW [dbo].[v_InfoPresentacionesPYG] AS
SELECT	 CodigoPresentacion		,NombrePresentacion		,Año		,Mes
		,CodigoConcepto			,NombreConcepto			,Sede		,Valor
FROM
(
	SELECT	 A.CodigoPresentacion		,P.NombrePresentacion		,A.Año		,A.Mes
			,A.CodigoConcepto			,A.NombreConcepto			,A.Valor
			,Sede = CASE WHEN LTRIM(RTRIM(A.Sede)) = 'Administración BN' THEN 'BN-Centro Administrativo'
						WHEN LTRIM(RTRIM(A.Sede)) = 'Bellpi Puente Aranda' THEN 'BE-Bta-P. Aranda'
						WHEN LTRIM(RTRIM(A.Sede)) = 'BYD-Chia-Fontanar' THEN 'BYD-Chía-Fontanar'
						WHEN LTRIM(RTRIM(A.Sede)) = 'BYD-Ibague-Mirolindo' THEN 'BYD-Ibagué-Mirolindo'
						WHEN LTRIM(RTRIM(A.Sede)) = 'BYD-Villavo-Anillo Vial' THEN 'BYD-Villavo-Anillo Víal'
						WHEN LTRIM(RTRIM(A.Sede)) = 'DAI.C-Bta-Cll 80' THEN 'DAI.C-Cota-Cll 80'
						WHEN LTRIM(RTRIM(A.Sede)) = 'DAI-V-Bta-Calle 72' THEN 'DAI.V-Btá-Calle 72'
						WHEN LTRIM(RTRIM(A.Sede)) = 'Ecommerce' THEN 'BN-Bta-Proyecto ecomerce'
						WHEN LTRIM(RTRIM(A.Sede)) = 'Ford - 170' THEN 'FR-Bta-Cl.170'
						WHEN LTRIM(RTRIM(A.Sede)) = 'Ford -San Fernando' THEN 'FR-Bta-S.Fernando'
						WHEN LTRIM(RTRIM(A.Sede)) = 'JD-Ruta-40' THEN 'JD-Ruta 40'
						WHEN LTRIM(RTRIM(A.Sede)) = 'MIT - Calle 123' THEN 'MIT-Bta-Calle 123'
						WHEN LTRIM(RTRIM(A.Sede)) = 'MIT Aduanas Repuestos' THEN 'MIT-Bta Aduanas Repuestos'
						WHEN LTRIM(RTRIM(A.Sede)) = 'Renault - Puente Aranda' THEN 'RN-Bta-P.Aranda'
						WHEN LTRIM(RTRIM(A.Sede)) = 'VO-Bta-AV Ciudad De Cali' THEN 'VO-Bta-Av. Ciudad Cali'
						ELSE LTRIM(RTRIM(A.Sede)) END
	FROM
	(
		SELECT	 i.CodigoPresentacion		,Año=i.Año2				,Mes=i.MesFinal2		,i.CodigoConcepto
				,i.NombreConcepto			,Sede = i.sede1			,Valor = i.Actual1
		FROM [InformesComiteDB].dbo.[InformesDefinitivos]     i
		LEFT JOIN [InformesComiteDB].dbo.InformesPresentaciones	p on i.CodigoPresentacion = p.CodigoPresentacion
		WHERE i.CodigoPresentacion IN (5,6,7,8,9,12,17,28,29,72,73,74,76,77,87,88,89,90,120,121,151,159)
			AND i.Balance = 17
			AND i.MesFinal1 <> MesFinal2
			AND i.CodigoConcepto = 230

		UNION ALL

		SELECT	 i.CodigoPresentacion		,Año=i.Año2				,Mes=i.MesFinal2		,i.CodigoConcepto
				,i.NombreConcepto			,Sede = i.Sede2			,Valor = i.Actual2
		FROM [InformesComiteDB].dbo.InformesDefinitivos              i
		LEFT JOIN [InformesComiteDB].dbo.InformesPresentaciones      p      on     i.CodigoPresentacion = p.CodigoPresentacion
		WHERE i.CodigoPresentacion IN (5,6,7,8,9,12,17,28,29,72,73,74,76,77,87,88,89,90,120,121,151,159)   
			AND i.Balance = 17
			AND i.MesFinal1 <> MesFinal2
			AND i.CodigoConcepto = 230

		UNION ALL

		SELECT	 i.CodigoPresentacion		,Año=i.Año2				,Mes=i.MesFinal2		,i.CodigoConcepto
				,i.NombreConcepto			,Sede = i.Sede3			,Valor = i.Actual3
		FROM [InformesComiteDB].dbo.InformesDefinitivos              i
		LEFT JOIN [InformesComiteDB].dbo.InformesPresentaciones      p      on     i.CodigoPresentacion = p.CodigoPresentacion
		WHERE i.CodigoPresentacion IN (5,6,7,8,9,12,17,28,29,72,73,74,76,77,87,88,89,90,120,121,151,159)   
			AND i.Balance = 17
			AND i.MesFinal1 <> MesFinal2
			AND i.CodigoConcepto = 230

		UNION ALL

		SELECT	 i.CodigoPresentacion		,Año=i.Año2				,Mes=i.MesFinal2		,i.CodigoConcepto
				,i.NombreConcepto			,Sede = i.sede4			,Valor = i.Actual4
		FROM [InformesComiteDB].dbo.InformesDefinitivos              i
		LEFT JOIN [InformesComiteDB].dbo.InformesPresentaciones      p      on     i.CodigoPresentacion = p.CodigoPresentacion
		WHERE i.CodigoPresentacion IN (5,6,7,8,9,12,17,28,29,72,73,74,76,77,87,88,89,90,120,121,151,159)   
			AND i.Balance = 17
			AND i.MesFinal1 <> MesFinal2
			AND i.CodigoConcepto = 230

		UNION ALL

		SELECT	 i.CodigoPresentacion		,Año=i.Año2				,Mes=i.MesFinal2		,i.CodigoConcepto
				,i.NombreConcepto			,Sede = i.sede5			,Valor = i.Actual5
		FROM [InformesComiteDB].dbo.InformesDefinitivos              i
		LEFT JOIN [InformesComiteDB].dbo.InformesPresentaciones      p      on     i.CodigoPresentacion = p.CodigoPresentacion
		WHERE i.CodigoPresentacion IN (5,6,7,8,9,12,17,28,29,72,73,74,76,77,87,88,89,90,120,121,151,159)   
			AND i.Balance = 17
			AND i.MesFinal1 <> MesFinal2
			AND i.CodigoConcepto = 230

		UNION ALL

		SELECT	 i.CodigoPresentacion		,Año=i.Año2				,Mes=i.MesFinal2		,i.CodigoConcepto
				,i.NombreConcepto			,Sede = i.sede6			,Valor = i.Actual6
		FROM [InformesComiteDB].dbo.InformesDefinitivos              i
		LEFT JOIN [InformesComiteDB].dbo.InformesPresentaciones      p      on     i.CodigoPresentacion = p.CodigoPresentacion
		WHERE i.CodigoPresentacion IN (5,6,7,8,9,12,17,28,29,72,73,74,76,77,87,88,89,90,120,121,151,159)   
			AND i.Balance = 17
			AND i.MesFinal1 <> MesFinal2
			AND i.CodigoConcepto = 230

		UNION ALL

		SELECT	 i.CodigoPresentacion		,Año=i.Año2				,Mes=i.MesFinal2		,i.CodigoConcepto
				,i.NombreConcepto			,Sede = i.sede7			,Valor = i.Actual7
		FROM [InformesComiteDB].dbo.InformesDefinitivos              i
		LEFT JOIN [InformesComiteDB].dbo.InformesPresentaciones      p      on     i.CodigoPresentacion = p.CodigoPresentacion
		WHERE i.CodigoPresentacion IN (5,6,7,8,9,12,17,28,29,72,73,74,76,77,87,88,89,90,120,121,151,159)   
			AND i.Balance = 17
			AND i.MesFinal1 <> MesFinal2
			AND i.CodigoConcepto = 230

		UNION ALL

		SELECT	 i.CodigoPresentacion		,Año=i.Año2				,Mes=i.MesFinal2		,i.CodigoConcepto
				,i.NombreConcepto			,Sede = i.sede8			,Valor = i.Actual8
		FROM [InformesComiteDB].dbo.InformesDefinitivos              i
		LEFT JOIN [InformesComiteDB].dbo.InformesPresentaciones      p      on     i.CodigoPresentacion = p.CodigoPresentacion
		WHERE i.CodigoPresentacion IN (5,6,7,8,9,12,17,28,29,72,73,74,76,77,87,88,89,90,120,121,151,159)   
			AND i.Balance = 17
			AND i.MesFinal1 <> MesFinal2
			AND i.CodigoConcepto = 230

		UNION ALL

		SELECT	 i.CodigoPresentacion		,Año=i.Año2				,Mes=i.MesFinal2		,i.CodigoConcepto
				,i.NombreConcepto			,Sede = i.sede9			,Valor = i.Actual9
		FROM [InformesComiteDB].dbo.InformesDefinitivos              i
		LEFT JOIN [InformesComiteDB].dbo.InformesPresentaciones      p      on     i.CodigoPresentacion = p.CodigoPresentacion
		WHERE i.CodigoPresentacion IN (5,6,7,8,9,12,17,28,29,72,73,74,76,77,87,88,89,90,120,121,151,159)   
			AND i.Balance = 17
			AND i.MesFinal1 <> MesFinal2
			AND i.CodigoConcepto = 230

		UNION ALL

		SELECT	 i.CodigoPresentacion		,Año=i.Año2				,Mes=i.MesFinal2		,i.CodigoConcepto
				,i.NombreConcepto			,Sede = i.sede10		,Valor = i.Actual10
		FROM [InformesComiteDB].dbo.InformesDefinitivos              i
		LEFT JOIN [InformesComiteDB].dbo.InformesPresentaciones      p      on     i.CodigoPresentacion = p.CodigoPresentacion
		WHERE i.CodigoPresentacion IN (5,6,7,8,9,12,17,28,29,72,73,74,76,77,87,88,89,90,120,121,151,159)   
			AND i.Balance = 17
			AND i.MesFinal1 <> MesFinal2
			AND i.CodigoConcepto = 230

		UNION ALL

		SELECT	 i.CodigoPresentacion		,Año=i.Año2				,Mes=i.MesFinal2		,i.CodigoConcepto
				,i.NombreConcepto			,Sede = i.sede11		,Valor = i.Actual11
		FROM [InformesComiteDB].dbo.InformesDefinitivos              i
		LEFT JOIN [InformesComiteDB].dbo.InformesPresentaciones      p      on     i.CodigoPresentacion = p.CodigoPresentacion
		WHERE i.CodigoPresentacion IN (5,6,7,8,9,12,17,28,29,72,73,74,76,77,87,88,89,90,120,121,151,159)   
			AND i.Balance = 17
			AND i.MesFinal1 <> MesFinal2
			AND i.CodigoConcepto = 230

		UNION ALL

		SELECT	 i.CodigoPresentacion		,Año=i.Año2				,Mes=i.MesFinal2		,i.CodigoConcepto
				,i.NombreConcepto			,Sede = i.Sede12		,Valor = i.Actual12
		FROM [InformesComiteDB].dbo.InformesDefinitivos              i
		LEFT JOIN [InformesComiteDB].dbo.InformesPresentaciones      p      on     i.CodigoPresentacion = p.CodigoPresentacion
		WHERE i.CodigoPresentacion IN (5,6,7,8,9,12,17,28,29,72,73,74,76,77,87,88,89,90,120,121,151,159)   
			AND i.Balance = 17
			AND i.MesFinal1 <> MesFinal2
			AND i.CodigoConcepto = 230

		UNION ALL

		SELECT	 i.CodigoPresentacion		,Año=i.Año2				,Mes=i.MesFinal2		,i.CodigoConcepto
				,i.NombreConcepto			,Sede = i.Sede13		,Valor = i.Actual13
		FROM [InformesComiteDB].dbo.InformesDefinitivos              i
		LEFT JOIN [InformesComiteDB].dbo.InformesPresentaciones      p      on     i.CodigoPresentacion = p.CodigoPresentacion
		WHERE i.CodigoPresentacion IN (5,6,7,8,9,12,17,28,29,72,73,74,76,77,87,88,89,90,120,121,151,159)   
			AND i.Balance = 17
			AND i.MesFinal1 <> MesFinal2
			AND i.CodigoConcepto = 230

		UNION ALL

		SELECT	 i.CodigoPresentacion		,Año=i.Año2				,Mes=i.MesFinal2		,i.CodigoConcepto
				,i.NombreConcepto			,Sede = i.Sede14		,Valor = i.Actual14
		FROM [InformesComiteDB].dbo.InformesDefinitivos              i
		LEFT JOIN [InformesComiteDB].dbo.InformesPresentaciones      p      on     i.CodigoPresentacion = p.CodigoPresentacion
		WHERE i.CodigoPresentacion IN (5,6,7,8,9,12,17,28,29,72,73,74,76,77,87,88,89,90,120,121,151,159)   
			AND i.Balance = 17
			AND i.MesFinal1 <> MesFinal2
			AND i.CodigoConcepto = 230

		UNION ALL

		SELECT	 i.CodigoPresentacion		,Año=i.Año2				,Mes=i.MesFinal2		,i.CodigoConcepto
				,i.NombreConcepto			,Sede = i.Sede15		,Valor = i.Actual15
		FROM [InformesComiteDB].dbo.InformesDefinitivos              i
		LEFT JOIN [InformesComiteDB].dbo.InformesPresentaciones      p      on     i.CodigoPresentacion = p.CodigoPresentacion
		WHERE i.CodigoPresentacion IN (5,6,7,8,9,12,17,28,29,72,73,74,76,77,87,88,89,90,120,121,151,159)   
			AND i.Balance = 17
			AND i.MesFinal1 <> MesFinal2
			AND i.CodigoConcepto = 230

		UNION ALL

		SELECT	 i.CodigoPresentacion		,Año=i.Año2				,Mes=i.MesFinal2		,i.CodigoConcepto
				,i.NombreConcepto			,Sede = i.Sede16		,Valor = i.Actual16
		FROM [InformesComiteDB].dbo.InformesDefinitivos              i
		LEFT JOIN [InformesComiteDB].dbo.InformesPresentaciones      p      on     i.CodigoPresentacion = p.CodigoPresentacion
		WHERE i.CodigoPresentacion IN (5,6,7,8,9,12,17,28,29,72,73,74,76,77,87,88,89,90,120,121,151,159)   
			AND i.Balance = 17
			AND i.MesFinal1 <> MesFinal2
			AND i.CodigoConcepto = 230

		UNION ALL

		SELECT	 i.CodigoPresentacion		,Año=i.Año2				,Mes=i.MesFinal2		,i.CodigoConcepto
				,i.NombreConcepto			,Sede = i.Sede17		,Valor = i.Actual17
		FROM [InformesComiteDB].dbo.InformesDefinitivos              i
		LEFT JOIN [InformesComiteDB].dbo.InformesPresentaciones      p      on     i.CodigoPresentacion = p.CodigoPresentacion
		WHERE i.CodigoPresentacion IN (5,6,7,8,9,12,17,28,29,72,73,74,76,77,87,88,89,90,120,121,151,159)   
			AND i.Balance = 17
			AND i.MesFinal1 <> MesFinal2
			AND i.CodigoConcepto = 230

		UNION ALL

		SELECT	 i.CodigoPresentacion		,Año=i.Año2				,Mes=i.MesFinal2		,i.CodigoConcepto
				,i.NombreConcepto			,Sede = i.sede18		,Valor = i.Actual18
		FROM [InformesComiteDB].dbo.InformesDefinitivos              i
		LEFT JOIN [InformesComiteDB].dbo.InformesPresentaciones      p      on     i.CodigoPresentacion = p.CodigoPresentacion
		WHERE i.CodigoPresentacion IN (5,6,7,8,9,12,17,28,29,72,73,74,76,77,87,88,89,90,120,121,151,159)   
			AND i.Balance = 17
			AND i.MesFinal1 <> MesFinal2
			AND i.CodigoConcepto = 230

		UNION ALL

		SELECT	 i.CodigoPresentacion		,Año=i.Año2				,Mes=i.MesFinal2		,i.CodigoConcepto
				,i.NombreConcepto			,Sede = i.sede19		,Valor = i.Actual19
		FROM [InformesComiteDB].dbo.InformesDefinitivos              i
		LEFT JOIN [InformesComiteDB].dbo.InformesPresentaciones      p      on     i.CodigoPresentacion = p.CodigoPresentacion
		WHERE i.CodigoPresentacion IN (5,6,7,8,9,12,17,28,29,72,73,74,76,77,87,88,89,90,120,121,151,159)   
			AND i.Balance = 17
			AND i.MesFinal1 <> MesFinal2
			AND i.CodigoConcepto = 230

		UNION ALL

		SELECT	 i.CodigoPresentacion		,Año=i.Año2				,Mes=i.MesFinal2		,i.CodigoConcepto
				,i.NombreConcepto			,Sede = i.sede20		,Valor = i.Actual20
		FROM [InformesComiteDB].dbo.InformesDefinitivos              i
		LEFT JOIN [InformesComiteDB].dbo.InformesPresentaciones      p      on     i.CodigoPresentacion = p.CodigoPresentacion
		WHERE i.CodigoPresentacion IN (5,6,7,8,9,12,17,28,29,72,73,74,76,77,87,88,89,90,120,121,151,159)   
			AND i.Balance = 17
			AND i.MesFinal1 <> MesFinal2
			AND i.CodigoConcepto = 230

		UNION ALL

		SELECT	 i.CodigoPresentacion		,Año=i.Año2				,Mes=i.MesFinal2		,i.CodigoConcepto
				,i.NombreConcepto			,Sede = i.sede21		,Valor = i.Actual21
		FROM [InformesComiteDB].dbo.InformesDefinitivos              i
		LEFT JOIN [InformesComiteDB].dbo.InformesPresentaciones      p      on     i.CodigoPresentacion = p.CodigoPresentacion
		WHERE i.CodigoPresentacion IN (5,6,7,8,9,12,17,28,29,72,73,74,76,77,87,88,89,90,120,121,151,159)   
			AND i.Balance = 17
			AND i.MesFinal1 <> MesFinal2
			AND i.CodigoConcepto = 230

		UNION ALL

		SELECT	 i.CodigoPresentacion		,Año=i.Año2				,Mes=i.MesFinal2		,i.CodigoConcepto
				,i.NombreConcepto			,Sede = i.sede22		,Valor = i.Actual22
		FROM [InformesComiteDB].dbo.InformesDefinitivos              i
		LEFT JOIN [InformesComiteDB].dbo.InformesPresentaciones      p      on     i.CodigoPresentacion = p.CodigoPresentacion
		WHERE i.CodigoPresentacion IN (5,6,7,8,9,12,17,28,29,72,73,74,76,77,87,88,89,90,120,121,151,159)   
			AND i.Balance = 17
			AND i.MesFinal1 <> MesFinal2
			AND i.CodigoConcepto = 230

		UNION ALL

		SELECT	 i.CodigoPresentacion		,Año=i.Año2				,Mes=i.MesFinal2		,i.CodigoConcepto
				,i.NombreConcepto			,Sede = i.sede23		,Valor = i.Actual23
		FROM [InformesComiteDB].dbo.InformesDefinitivos              i
		LEFT JOIN [InformesComiteDB].dbo.InformesPresentaciones      p      on     i.CodigoPresentacion = p.CodigoPresentacion
		WHERE i.CodigoPresentacion IN (5,6,7,8,9,12,17,28,29,72,73,74,76,77,87,88,89,90,120,121,151,159)   
			AND i.Balance = 17
			AND i.MesFinal1 <> MesFinal2
			AND i.CodigoConcepto = 230

		UNION ALL

		SELECT	 i.CodigoPresentacion		,Año=i.Año2				,Mes=i.MesFinal2		,i.CodigoConcepto
				,i.NombreConcepto			,Sede = i.sede24		,Valor = i.Actual24
		FROM [InformesComiteDB].dbo.InformesDefinitivos              i
		LEFT JOIN [InformesComiteDB].dbo.InformesPresentaciones      p      on     i.CodigoPresentacion = p.CodigoPresentacion
		WHERE i.CodigoPresentacion IN (5,6,7,8,9,12,17,28,29,72,73,74,76,77,87,88,89,90,120,121,151,159)   
			AND i.Balance = 17
			AND i.MesFinal1 <> MesFinal2
			AND i.CodigoConcepto = 230

		UNION ALL

		SELECT	 i.CodigoPresentacion		,Año=i.Año2				,Mes=i.MesFinal2		,i.CodigoConcepto
				,i.NombreConcepto			,Sede = i.sede25		,Valor = i.Actual25
		FROM [InformesComiteDB].dbo.InformesDefinitivos              i
		LEFT JOIN [InformesComiteDB].dbo.InformesPresentaciones      p      on     i.CodigoPresentacion = p.CodigoPresentacion
		WHERE i.CodigoPresentacion IN (5,6,7,8,9,12,17,28,29,72,73,74,76,77,87,88,89,90,120,121,151,159)   
			AND i.Balance = 17
			AND i.MesFinal1 <> MesFinal2
			AND i.CodigoConcepto = 230  

	) a    
	LEFT JOIN [InformesComiteDB].dbo.InformesPresentaciones      p on a.CodigoPresentacion = p.codigopresentacion
) A
--where sede <> ' ' and Año = YEAR('20201201') and Mes = MONTH('20201201') and CodigoConcepto = 230

```
