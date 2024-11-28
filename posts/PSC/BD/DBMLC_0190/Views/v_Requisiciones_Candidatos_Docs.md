# View: v_Requisiciones_Candidatos_Docs

## Usa los objetos:
- [[Requisiciones_Candidatos]]
- [[Requisiciones_SolicitudesDocumentos]]
- [[v_Requisiciones_Clase]]
- [[v_Requisiciones_Observaciones_Candidato]]

```sql

CREATE VIEW [dbo].[v_Requisiciones_Candidatos_Docs] AS
SELECT	DISTINCT							
	--Datos del Candidato
	Docs.IdSolicitud,						Docs.Cedula,								Candidato.Nombres,
	Candidato.Apellido1,					Candidato.Apellido2,						Candidato.NombreCompleto,
	Candidato.CodTipoIdentificacion,		Candidato.TipoIdentificacion,				Candidato.Telefono,
	Candidato.Celular,						Candidato.Correo,							Candidato.Direccion,
	Candidato.FechaNacimiento,				Candidato.ObservacionesCandidato,

	--Documentos del Candidato
	Docs.Antecedentes,						Docs.Entrevista,							Docs.ReferenciasLaborales,
	Docs.VisitaDomiciliaria,				Docs.ExamenMedico,							Docs.Poligrafo,
	Docs.PruebasPsicotecnicas,				Docs.ArchivoHV,								Docs.CertificadoSena,
	Docs.LicenciaConduccion,				Docs.PruebasConocimiento,					Docs.EntrevistaReclutador,

	--Observaciones
	ObservacionesEntrevista = Obs.Observaciones_Entrevistado,			
	ObservacionesRechazo	= Obs.Observaciones_NoSeleccionado,			
	ObservacionesDevolucion = Obs.Observaciones_DevueltoSeleccion


--Candidatos con Documentos
FROM (
	SELECT IdSolicitud,					 Cedula						,EntrevistaReclutador=MAX(ETR)		,Entrevista=MAX(ET)				
		,LicenciaConduccion=MAX(LC)		,CertificadoSena=MAX(CS)	,ReferenciasLaborales=MAX(RL)		,ArchivoHV=MAX(HV)		
		,VisitaDomiciliaria=MAX(VD)		,Poligrafo=MAX(PO)			,PruebasPsicotecnicas=MAX(PP)		,ExamenMedico=MAX(EM)				
		,PruebasConocimiento=MAX(PC)	,Antecedentes=MAX(AT)
	FROM (
		SELECT IdSolicitud,		Cedula
			,CASE WHEN IdDocumento = 1  THEN Archivo ELSE NULL END AS AT
			,CASE WHEN IdDocumento = 2  THEN Archivo ELSE NULL END AS ET
			,CASE WHEN IdDocumento = 3  THEN Archivo ELSE NULL END AS RL
			,CASE WHEN IdDocumento = 4  THEN Archivo ELSE NULL END AS VD
			,CASE WHEN IdDocumento = 5  THEN Archivo ELSE NULL END AS EM
			,CASE WHEN IdDocumento = 6  THEN Archivo ELSE NULL END AS PO
			,CASE WHEN IdDocumento = 7  THEN Archivo ELSE NULL END AS PP
			,CASE WHEN IdDocumento = 8  THEN Archivo ELSE NULL END AS HV
			,CASE WHEN IdDocumento = 9  THEN Archivo ELSE NULL END AS CS
			,CASE WHEN IdDocumento = 10 THEN Archivo ELSE NULL END AS LC
			,CASE WHEN IdDocumento = 11 THEN Archivo ELSE NULL END AS PC
			,CASE WHEN IdDocumento = 12 THEN Archivo ELSE NULL END AS ETR
		FROM Requisiciones_SolicitudesDocumentos
	) A
	GROUP BY IdSolicitud, Cedula
) AS Docs 

--Datos Personales del Candidato
LEFT JOIN (
	SELECT	R.Cedula,					R.Telefono,											R.Celular,						
			R.Correo,					Nombres=LTRIM(RTRIM(UPPER(R.Nombres))),				CodTipoIdentificacion=R.TipIdentificacion,			
			R.FechaNacimiento,			Apellido1=LTRIM(RTRIM(UPPER(R.Apellido1))),			TipoIdentificacion=TD.SubClase,	
			R.Direccion,				Apellido2=LTRIM(RTRIM(UPPER(R.Apellido2))),			ObservacionesCandidato=R.Observaciones,
			NombreCompleto=LTRIM(RTRIM(UPPER(REPLACE(REPLACE(REPLACE(CONCAT(R.Nombres,' ',R.Apellido1,' ',R.Apellido2),' ','<>'),'><',''),'<>',' '))))
	FROM Requisiciones_Candidatos R

	LEFT JOIN v_Requisiciones_Clase	AS TD ON  R.TipIdentificacion = TD.CodSubClase AND TD.CodClase = 1
) AS Candidato ON Candidato.Cedula = Docs.Cedula

--Observaciones del Historico del Candidato
LEFT JOIN v_Requisiciones_Observaciones_Candidato AS Obs ON Obs.CedulaCandidato = Docs.Cedula AND Obs.IdSolicitud = Docs.IdSolicitud

```
