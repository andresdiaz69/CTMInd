# Stored Procedure: sp_prt_EventoCapacitacion

## Usa los objetos:
- [[GTH_Confirma_Asistencia]]
- [[GTH_Estados]]
- [[GTH_EventoInvita]]
- [[GTH_EventosProg]]
- [[rhh_emplea]]
- [[v_GTH_EvenCapac]]

```sql


-- =============================================
-- Author:		Jessy Tatiana Peralta Florez
-- Create date: Marzo 2023
-- Description:	Consulta los eventos que se puede incribir o en los cuales va a participar

--SPA2023 - 0309 Agregar motivo al no asistir a evento
--Modified by:		Alexander Vargas
--Modified date:	30/05/2023
--Descripcion: se agregan parametros de indAsistio y motInasistencia 

-- exec sp_prt_EventoCapacitacion '1018465875','','DatosConfirmarAsistencia'

-- =============================================
CREATE PROCEDURE [dbo].[sp_prt_EventoCapacitacion]
	@cod_emp			CHAR(12) = NULL,
	@cod_even			VARCHAR(6) = NULL,
	@opcion				CHAR(35),
	@motRechazoConfirma	NVARCHAR(400) = NULL,
	@indAsistio	    BIT=0,
	@motInasistencia   NVARCHAR(MAX)=NULL 
	
--WITH ENCRYPTION	
AS
BEGIN
	
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

	IF (@opcion='DatosConfirmarAsistencia')
	BEGIN
		SELECT	EI.cod_even,--Cod Evento
				EB.nom_even,--Nombre Evento
				EI.cod_emp, --Cod Empleado
				CONCAT(E.nom_emp,' ',E.ap1_emp,' ',E.ap2_emp) AS NOMBRE, --Nombre Empleado
				EI.ind_asis, -- Ind Asistencia
				EI.cod_conf, -- Codigo Estado Asistencia 
				CA.descripcion, -- Descrip Estado Asistencia
				EB.Cod_est AS cod_EstadoEvento, -- Estado Evento
				ES.Des_Est AS des_EstadoEvento, -- Des Estado Evento
				EB.fch_prog AS fechaProgramacion, -- Fec Programacion Evento
				EB.Descrip_even, --Descripcion Evento
				
				EB.nom_instruc,--InstructorResponsable
				EB.Entidad--Entidad
					

				--EI.cod_estado AS cod_EstadoInvitado,  -- Estado Invitado
				--IE.nom_inscri AS nom_InscriInvitado  -- Des Estado Invitado
		
		FROM GTH_EventoInvita EI
			INNER JOIN v_GTH_EvenCapac EB ON EI.cod_even = EB.cod_even 
			INNER JOIN rhh_emplea E ON EI.cod_emp= E.cod_emp
			INNER JOIN GTH_Confirma_Asistencia CA ON EI.cod_conf = CA.cod_conf
			INNER JOIN GTH_Estados ES ON EB.Cod_est = ES.cod_est
			--INNER JOIN GTH_Inscripcion_Evento IE ON IE.cod_inscri = EI.cod_estado
		WHERE EB.Cod_est in ('05','07') 
			AND EB.fch_prog > GETDATE()
			AND EI.cod_conf='03'
			AND EI.cod_emp = @cod_emp


	END

	IF (@opcion='DatosEventosParaInscribirse')
	BEGIN
			SELECT	
					EB.cod_even,--Cod Evento
					EB.nom_even,--Nombre Evento
					EB.Cod_est AS cod_EstadoEvento, -- Cod Estado Evento
					ES.Des_Est AS des_EstadoEvento, -- Des Estado Evento
					EB.Descrip_even, --Descripcion Evento
					EB.fch_prog AS fechaProgramacion, -- Fec Programacion Evento
					
					/* Inscripciones */
					EB.ind_insc_vol,-- Admite Inscripciones
					EB.fec_insc_ini, --Fec Inicio Inscripciones
					EB.fec_insc_fin, --Fec Fin Inscripciones
					
					
					EB.nom_instruc,--InstructorResponsable
					EB.Entidad,--Entidad
					EB.Asist_pre
					
			
			FROM v_GTH_EvenCapac EB
				INNER JOIN GTH_Estados ES ON EB.Cod_est = ES.cod_est
				
				
			WHERE EB.Cod_est in ('05','07') 
				AND EB.ind_insc_vol=1
				AND EB.fec_insc_ini <= GETDATE()
				AND EB.fec_insc_fin > GETDATE()
				AND EB.fch_prog > GETDATE()
				AND EB.cod_even NOT IN (SELECT distinct(cod_even) 
										FROM GTH_EventoInvita 
										where cod_emp = @cod_emp --'1018465875'
										)
				

	END
	
	IF (@opcion='ProgramacionEvento')
	BEGIN
			SELECT	
					EP.cod_even,--Cod Evento
					
					/* Programación */
					EP.fec_ses, -- Fecha Sesion evento
					CONCAT(EP.hora_ini,':',EP.min_ini) as horaInicial, -- Hora Inicio
					CONCAT(EP.hora_fin,':',EP.min_fin) as horaFinal, -- Hora Inicio
					EP.lug_ses -- Lugar de la sesion.
					
			FROM GTH_EventosProg EP
				
			WHERE cod_even = @cod_even
				

	END
	
	IF (@opcion='Inscribir')
	BEGIN

		INSERT INTO GTH_EventoInvita (cod_emp, cod_even, ind_asis, cod_conf,cod_estado,motivo_rech) 
		VALUES (@cod_emp,@cod_even,0,'03',NULL,NULL)
		
				
	END

	IF (@opcion='ConfirmarAsistencia')
	BEGIN
		--select * from GTH_EventoInvita where cod_even='eve' and cod_emp='1018465875'
		
		update GTH_EventoInvita set cod_conf='01',cod_estado='01', motivo_rech = @motRechazoConfirma
			where cod_even = @cod_even 
				and cod_emp = @cod_emp

	END

	IF (@opcion='RechazaAsistencia')
	BEGIN
		/* CONSULTAS DE LOS ESTADOS
		select * from GTH_Inscripcion_Evento
		select * from GTH_Confirma_Asistencia
		*/
		update GTH_EventoInvita set cod_conf='02', xq_no_asis = @motRechazoConfirma
			where cod_even = @cod_even 
				and cod_emp = @cod_emp

	END

	IF (@opcion='DatosMacarAsistencia')
	BEGIN
		/* CONSULTAS DE LOS ESTADOS
		select * from GTH_Inscripcion_Evento
		select * from GTH_Confirma_Asistencia
		*/

		SELECT EB.cod_even,
				EB.nom_even,
				EB.Descrip_even,
				EB.fch_prog AS fechaProgramacion, -- Fec Programacion Evento
				EI.ind_asis,
				EB.nom_instruc,--InstructorResponsable
				EB.Entidad--Entidad
		
		FROM GTH_EventoInvita EI
		INNER JOIN v_GTH_EvenCapac EB ON EI.cod_even = EB.cod_even
		
		WHERE	EI.cod_emp = @cod_emp
				AND EB.fec_eje < GETDATE()
				AND EI.cod_estado = '01' --INSCRITO
				AND EI.cod_conf = '01' --Si Asistirá
				AND EI.ind_asis = 0
				AND (LEN(EI.mot_inasis)=0 OR EI.mot_inasis IS NULL)

	END

	IF (@opcion='MarcaAsistencia')
	BEGIN
		/* CONSULTAS DE LOS ESTADOS
		select * from GTH_Inscripcion_Evento
		select * from GTH_Confirma_Asistencia
		*/

		UPDATE GTH_EventoInvita SET ind_asis = @indAsistio, mot_inasis=@motInasistencia
		WHERE	cod_emp = @cod_emp
				AND cod_even = @cod_even
	
	END

END

```
