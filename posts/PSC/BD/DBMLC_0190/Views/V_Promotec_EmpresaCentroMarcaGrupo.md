# View: V_Promotec_EmpresaCentroMarcaGrupo

## Usa los objetos:
- [[Centros]]
- [[Empresas]]
- [[EmpresasCentros]]
- [[VehiculosMarcas]]
- [[VehiculosMarcasGrupos]]
- [[vw_Centros]]

```sql
/* 
VISTA QUE AGRUPA LAS EMPRESAS
						, LOS CENTROS
						, LAS MARCAS GRUPOS
PARA PROMOTEC FORMULARIO COTIZACION  
*/



--USE Desarrollo_DBMLC_0190;

--IF OBJECT_ID('V_Promotec_EmpresaCentroMarcaGrupo') IS NOT NULL
--	DROP VIEW V_Promotec_EmpresaCentroMarcaGrupo


CREATE VIEW [dbo].[V_Promotec_EmpresaCentroMarcaGrupo]
AS
SELECT	Z.*
FROM	(	SELECT	E.CodigoEmpresa
					, P.NombreEmpresa
					, E.CodigoCentro
					, C.NombreCentro
					, V.SiglaMarca
					, A.CodigoMarcaGrupo
					, A.MarcaGrupo
			FROM	EmpresasCentros E
					, Empresas P
					, Centros C
					, vw_Centros V
					,(	SELECT	DISTINCT M.CodigoMarcaGrupo
								, G.MarcaGrupo
								, M.SiglaMarca
						FROM	VehiculosMarcasGrupos G
								, ( SELECT	*
									FROM	VehiculosMarcas
									WHERE	SiglaMarca IS NOT NULL	)M
						WHERE	G.CodigoMarcaGrupo = M.CodigoMarcaGrupo	)A
			WHERE	E.CodigoEmpresa = P.CodigoEmpresa 
					AND E.CodigoCentro = C.CodigoCentro 
					AND E.CodigoCentro = V.CodigoCentro 
					AND V.SiglaMarca = A.SiglaMarca	) Z;

```
