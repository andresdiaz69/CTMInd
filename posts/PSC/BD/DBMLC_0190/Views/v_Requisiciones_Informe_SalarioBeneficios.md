# View: v_Requisiciones_Informe_SalarioBeneficios

## Usa los objetos:
- [[Cargos]]
- [[Requisiciones_HistoricoSalariosBeneficios]]
- [[Requisiciones_SalarioBasico]]
- [[Requisiciones_TipoBeneficios]]
- [[Requisiciones_ValorBeneficios]]
- [[UnidadDeNegocio]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_Informe_SalarioBeneficios] AS
SELECT	DISTINCT		
	CodigoCargo,				NombreCargo,				CodigoMarca,							NombreMarca, 
	TipoSalario,				Salario,					FechaModificacionSalario,				CodigoBeneficio,	
	NombreBeneficio, 			ValorBeneficio,				FechaModificacionBeneficio,				Estado, 
	FechaModificacion
FROM 
(
	SELECT DISTINCT		
		SB.CodigoCargo,							
		CASE WHEN Cargo.CodigoCargo IS NULL THEN Cargo2.NombreCargo ELSE Cargo.NombreCargo END NombreCargo,						
		SB.CodigoMarca,			
		(Marca.NombreUnidad)NombreMarca,		SB.TipoSalario,							SB.Salario, 			
		SB.FechaModificacionSalario,			SB.CodigoBeneficio,						SB.NombreBeneficio, 
		SB.ValorBeneficio,						SB.FechaModificacionBeneficio,			SB.Estado,
		CASE WHEN ISNULL(SB.FechaModificacionSalario, '19000101') >= ISNULL(SB.FechaModificacionBeneficio, '19000101') 
			THEN SB.FechaModificacionSalario ELSE SB.FechaModificacionBeneficio END FechaModificacion
	FROM (
		--Salarios y Beneficios Activos
		SELECT DISTINCT G.CodigoCargo, G.CodigoMarca, S.TipoSalario, S.Salario, S.FechaModificacionSalario,
			B.CodigoBeneficio, B.NombreBeneficio, B.ValorBeneficio, FechaModificacionBeneficio, Estado = 1
		FROM (
			SELECT DISTINCT CodigoCargo, CodigoMarca FROM Requisiciones_ValorBeneficios WHERE Activo = 1
			UNION ALL
			SELECT DISTINCT CodigoCargo, CodigoMarca FROM Requisiciones_SalarioBasico WHERE Activo = 1
		) G

		LEFT JOIN (
			SELECT b.CodigoCargo, b.TipoSalario, b.CodigoMarca, b.Salario, (B.Activo)EstadoSalario, 
				FechaModificacionSalario=MAX(CONVERT(DATE,FechaModificacion))
			FROM Requisiciones_SalarioBasico B
			LEFT JOIN Requisiciones_HistoricoSalariosBeneficios H ON B.CodigoCargo = H.CodCargo AND B.CodigoMarca = H.CodMarca
																	AND H.Tipo = 'SALARIO' AND B.TipoSalario = H.TipoSalario
			WHERE B.Activo = 1
			GROUP BY CodigoCargo, b.TipoSalario, b.CodigoMarca, b.Salario, b.Activo
		) S ON G.CodigoCargo = S.CodigoCargo AND G.CodigoMarca = S.CodigoMarca

		LEFT JOIN (
			SELECT B.CodigoCargo, B.CodigoMarca, B.CodigoBeneficio, TB.NombreBeneficio, (B.Valor)ValorBeneficio, 
				(B.Activo)EstadoBeneficio, FechaModificacionBeneficio=MAX(CONVERT(DATE,FechaModificacion))
			FROM Requisiciones_ValorBeneficios B
			LEFT JOIN Requisiciones_HistoricoSalariosBeneficios H ON B.CodigoCargo = H.CodCargo AND B.CodigoMarca = H.CodMarca
																	AND H.Tipo = 'BENEFICIO' AND B.CodigoBeneficio = H.CodBeneficio
			INNER JOIN Requisiciones_TipoBeneficios TB ON TB.IdBeneficio = B.CodigoBeneficio
			WHERE B.Activo = 1
			GROUP BY CodigoCargo, b.CodigoMarca, b.CodigoBeneficio, tb.NombreBeneficio, b.Valor, b.Activo
		) B ON G.CodigoCargo = B.CodigoCargo AND G.CodigoMarca = B.CodigoMarca


		UNION ALL


		--Salarios y Beneficios Inactivos								
		SELECT DISTINCT G.CodigoCargo, G.CodigoMarca, S.TipoSalario, S.Salario, S.FechaModificacionSalario,
			B.CodigoBeneficio, B.NombreBeneficio, B.ValorBeneficio, FechaModificacionBeneficio, Estado = 0
		FROM (
			SELECT DISTINCT CodigoCargo, CodigoMarca FROM Requisiciones_ValorBeneficios WHERE Activo = 0
			UNION ALL
			SELECT DISTINCT CodigoCargo, CodigoMarca FROM Requisiciones_SalarioBasico WHERE Activo = 0
		) G

		LEFT JOIN (
			SELECT b.CodigoCargo, b.TipoSalario, b.CodigoMarca, b.Salario, (B.Activo)EstadoSalario, 
				FechaModificacionSalario=MAX(CONVERT(DATE,FechaModificacion))
			FROM Requisiciones_SalarioBasico B
			LEFT JOIN Requisiciones_HistoricoSalariosBeneficios H ON B.CodigoCargo = H.CodCargo AND B.CodigoMarca = H.CodMarca
																	AND H.Tipo = 'SALARIO' AND B.TipoSalario = H.TipoSalario
			WHERE B.Activo = 0
			GROUP BY CodigoCargo, b.TipoSalario, b.CodigoMarca, b.Salario, b.Activo
		) S ON G.CodigoCargo = S.CodigoCargo AND G.CodigoMarca = S.CodigoMarca

		LEFT JOIN (
			SELECT B.CodigoCargo, B.CodigoMarca, B.CodigoBeneficio, TB.NombreBeneficio, (B.Valor)ValorBeneficio, 
				(B.Activo)EstadoBeneficio, FechaModificacionBeneficio=MAX(CONVERT(DATE,FechaModificacion))
			FROM Requisiciones_ValorBeneficios B
			LEFT JOIN Requisiciones_HistoricoSalariosBeneficios H ON B.CodigoCargo = H.CodCargo AND B.CodigoMarca = H.CodMarca
																	AND H.Tipo = 'BENEFICIO' AND B.CodigoBeneficio = H.CodBeneficio
			INNER JOIN Requisiciones_TipoBeneficios TB ON TB.IdBeneficio = B.CodigoBeneficio
			WHERE B.Activo = 0
			GROUP BY CodigoCargo, b.CodigoMarca, b.CodigoBeneficio, tb.NombreBeneficio, b.Valor, b.Activo
		) B ON G.CodigoCargo = B.CodigoCargo AND G.CodigoMarca = B.CodigoMarca								
	) SB

	LEFT JOIN (
		SELECT DISTINCT CodigoCargo, NombreCargo FROM Cargos 
		WHERE Obsoleto = 0 AND Activo = 1 AND NombreCargo NOT LIKE '(NA)%'
	) Cargo ON Cargo.CodigoCargo = SB.CodigoCargo
	
	LEFT JOIN (
		SELECT DISTINCT CodigoCargo, NombreCargo 
		FROM Cargos WHERE CodigoCargo NOT LIKE '0%'
	) Cargo2 ON Cargo2.CodigoCargo = SB.CodigoCargo

	LEFT JOIN (
		SELECT DISTINCT LTRIM(RTRIM(UnidadNegocio_Requisicion))CodUnidad, 
			LTRIM(RTRIM(NombreUnidadNegocio_Requisicion))NombreUnidad
		FROM UnidadDeNegocio 
	) Marca ON Marca.CodUnidad = SB.CodigoMarca
) A

```
