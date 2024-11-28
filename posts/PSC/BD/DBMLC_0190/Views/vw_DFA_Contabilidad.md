# View: vw_DFA_Contabilidad

## Usa los objetos:
- [[Centros]]
- [[DFA_Contabilidad]]
- [[Empresas]]
- [[InformesArboles]]
- [[Secciones]]
- [[vw_DFA_SpigaMarcas]]
- [[vw_UnidadDeNegocio]]

```sql
CREATE VIEW [dbo].[vw_DFA_Contabilidad] AS
SELECT DISTINCT IdRegistro, Ano_Periodo, Mes_Periodo, Cuenta, CodigoConcepto, NombreConcepto, CodigoEmpresa, NombreEmpresa, CodUnidadNegocio, 
	NombreUnidadNegocio, CodigoCentro, NombreCentro, CodigoSeccion, Seccion, CodDepartamento, NombreDepartamento, CodigoMarca, NombreMarca, 
	Gama, Canal, Debe, Haber, Saldo, CO, VN, VO, RE, TM, TC, XX, FechaAsientoInicial, FechaAsientoFinal 
FROM 
(
	SELECT A.IdRegistro, A.Ano_Periodo, A.Mes_Periodo, A.Cuenta, A.CodigoConcepto, CA.NombreConcepto, A.CodigoEmpresa, E.NombreEmpresa, A.CodUnidadNegocio, 
		U.NombreUnidadNegocio, a.CodDepartamento, D.NombreDepartamento, A.CodigoCentro, C.NombreCentro, A.CodigoSeccion, S.Seccion, (A.Marca)CodigoMarca, 
		M.NombreMarca, A.Gama, A.Canal, A.Debe, A.Haber, A.Saldo, A.CO, A.VN, A.VO, A.RE, A.TM, A.TC, A.XX, A.FechaAsientoInicial, A.FechaAsientoFinal

	FROM (
		SELECT * FROM DFA_Contabilidad	
		WHERE CodigoSeccion NOT IN (1259)
	) AS A
	LEFT JOIN Empresas		AS E	ON A.CodigoEmpresa	= E.CodigoEmpresa
	LEFT JOIN Centros		AS C	ON A.CodigoCentro	= C.CodigoCentro
	LEFT JOIN Secciones		AS S	ON A.CodigoSeccion	= S.CodigoSeccion
	LEFT JOIN [InformesComiteDB]..[InformesArboles] AS CA ON A.CodigoConcepto = CA.CodigoConcepto
															AND Balance = '17'
	LEFT JOIN 
	( 
		SELECT DISTINCT CodigoMarca, NombreMarca FROM vw_DFA_SpigaMarcas	
	) AS M	ON A.Marca = M.CodigoMarca
	LEFT JOIN 
	(
		SELECT DISTINCT CodUnidadNegocio, NombreUnidadNegocio 
		FROM vw_UnidadDeNegocio
	) AS U	ON A.CodUnidadNegocio = U.CodUnidadNegocio
	LEFT JOIN 
	(
		SELECT DISTINCT CodDepartamento, 
			(SELECT TOP(1) NombreDepartamento FROM vw_UnidadDeNegocio WHERE CodDepartamento = a.CodDepartamento)  NombreDepartamento
		FROM vw_UnidadDeNegocio A
	) AS D ON A.CodDepartamento = D.CodDepartamento
) S

```
