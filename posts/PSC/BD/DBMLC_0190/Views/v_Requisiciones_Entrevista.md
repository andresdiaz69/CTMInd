# View: v_Requisiciones_Entrevista

## Usa los objetos:
- [[Requisiciones_Entrevista]]
- [[v_Requisiciones_Clase]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_Entrevista] AS
SELECT	IdEntrevista,				IdSolicitud,				CodMunicipio,						Municipio,						CodCiudad,			
	Ciudad,							FechaPreEntrevista,			FechaEntrevista,					CedulaCandidato,				Edad,					
	(Sexo)CodSexo,					(TS.SubClase)Sexo,			(EstadoCivil)CodEstadoCivil,		(EC.SubClase)EstadoCivil,		TipoVivienda,		
	CodCiudadCandidato,				CiudadCandidato,			BarrioCandidato,					NucleoFamiliar,					TieneProcesoActivo,			
	CandidatoProcesoActivo,			Primaria,					Bachillerato,						Tecnico,						Tecnologo, 
	Profesional,					Postgrado,					CuentaConCertificado,				FortalezasCargo,				HabilidadesCargo, 
	ComentariosAdicionales,			Recomendaciones,			Observaciones
FROM Requisiciones_Entrevista A
LEFT JOIN v_Requisiciones_Clase TS ON A.Sexo = TS.CodSubClase AND TS.CodClase = 2 AND TS.Activo = 1
LEFT JOIN v_Requisiciones_Clase EC ON A.EstadoCivil = EC.CodSubClase AND EC.CodClase = 5 AND EC.Activo = 1

```
