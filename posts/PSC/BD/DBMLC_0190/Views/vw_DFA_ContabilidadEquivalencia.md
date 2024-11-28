# View: vw_DFA_ContabilidadEquivalencia

## Usa los objetos:
- [[DFA_ContabilidadEquivalencia]]
- [[DFA_Parametrizacion_CuentasProvision]]
- [[DFA_Parametrizacion_Equivalencia]]
- [[vw_DFA_Contabilidad]]

```sql
CREATE VIEW [dbo].[vw_DFA_ContabilidadEquivalencia] AS
SELECT	 DISTINCT							 IdRegistro					,Ano_Periodo					,Mes_Periodo				,Cuenta				
		,CodigoConcepto						,NombreConcepto				,Cta = LEFT(Cuenta, 1)			,CodigoEmpresa				,NombreEmpresa
		,CodUnidadNegocio					,NombreUnidadNegocio		,CodigoCentro					,NombreCentro				,CodigoSeccion
		,Seccion							,CodDepartamento			,NombreDepartamento				,CodigoMarca				,NombreMarca
		,Gama								,Canal						,Debe							,Haber						,Saldo
		,CO									,VN							,VO								,RE							,TM
		,TC									,XX							,FechaAsientoInicial			,FechaAsientoFinal			,Fuente
		,CodDepartamentoEquivalencia 		,Depto_Equivalencia			,Marca_Equivalencia				,DFA_Equivalencia			,Cero_Equivalencia
		,Sucursal_Equivalencia				,Cuenta_Equivalencia
		
		,Comentarios = CASE WHEN Cuenta IN (SELECT DISTINCT Cuenta FROM DFA_Parametrizacion_CuentasProvision) THEN 'Cuentas de provisión'
							WHEN CodigoSeccion = 0 THEN 'Movimientos sin sección' 
							ELSE '' END 
FROM 
(
	SELECT 
		--CONTABILIDAD DFA
		Contabilidad.IdRegistro				,Contabilidad.Ano_Periodo						,Contabilidad.Mes_Periodo				,Contabilidad.Cuenta 
		,Contabilidad.CodigoConcepto		,Contabilidad.NombreConcepto					,Contabilidad.CodigoEmpresa				,Contabilidad.NombreEmpresa 
		,Contabilidad.CodUnidadNegocio		,Contabilidad.NombreUnidadNegocio				,Contabilidad.CodigoCentro				,Contabilidad.NombreCentro
		,Contabilidad.CodigoSeccion			,Contabilidad.Seccion							,Contabilidad.CodDepartamento			,Contabilidad.NombreDepartamento
		,Contabilidad.CodigoMarca			,Contabilidad.NombreMarca						,Contabilidad.Gama						,Contabilidad.Canal
		,Contabilidad.Debe					,Contabilidad.Haber								,Contabilidad.Saldo						,Contabilidad.CO
		,Contabilidad.VN					,Contabilidad.VO								,Contabilidad.RE						,Contabilidad.TM
		,Contabilidad.TC					,Contabilidad.XX								,Contabilidad.FechaAsientoInicial 		,Contabilidad.FechaAsientoFinal

		--EQUIVALENCIAS DFA
		,Equivalencias.Fuente				,Equivalencias.Depto_Equivalencia				,Equivalencias.Marca_Equivalencia 		,Equivalencias.DFA_Equivalencia		
		,Equivalencias.Cero_Equivalencia	,Equivalencias.Sucursal_Equivalencia			,Equivalencias.Cuenta_Equivalencia
		
		,CodDepartamentoEquivalencia = CASE WHEN Equivalencias.CodDepartamentoEquivalencia = 'MO' THEN 'TM' ELSE Equivalencias.CodDepartamentoEquivalencia END

	FROM vw_DFA_Contabilidad Contabilidad
	LEFT JOIN 
	(
		SELECT	 C.IdRegistroContabilidad		,Fuente					,E.CodDepartamentoEquivalencia		,E.Depto_Equivalencia
				,E.Marca_Equivalencia			,E.DFA_Equivalencia 	,E.Cero_Equivalencia				,E.Sucursal_Equivalencia 
				,E.Cuenta_Equivalencia			,Ano_Periodo			,Mes_Periodo
		FROM DFA_ContabilidadEquivalencia C
		LEFT JOIN 
		(	
			SELECT * FROM DFA_Parametrizacion_Equivalencia WHERE Activo = 1
		) E ON E.IdRegistro = C.IdRegistroEquivalencia
	) Equivalencias ON Contabilidad.IdRegistro = Equivalencias.IdRegistroContabilidad
		AND Contabilidad.Ano_Periodo = Equivalencias.Ano_Periodo
		AND Contabilidad.Mes_Periodo = Equivalencias.Mes_Periodo
) A 

```
