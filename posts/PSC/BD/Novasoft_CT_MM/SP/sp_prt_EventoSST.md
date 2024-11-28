# Stored Procedure: sp_prt_EventoSST

## Usa los objetos:
- [[GTH_Confirma_Asistencia]]
- [[GTH_Estados]]
- [[rhh_emplea]]
- [[SST_Eventos]]
- [[SST_EventosInvita]]
- [[SST_EventosProg]]

```sql

-- =============================================
-- Author:		Jessy Tatiana Peralta Florez
-- Create date: Junio 13
-- Description:	Consulta los eventos que se puede incribir o en los cuales va a participar


-- exec sp_prt_EventoSST '1018465875','','DatosConfirmarAsistencia'

-- =============================================
CREATE PROCEDURE [dbo].[sp_prt_EventoSST]
	
	@opcion				CHAR(35),

	--evento SST
	@anio		char(4)= NULL,
	@version	varchar(20)= NULL,
	@cons		int=0,
	@cod_even	varchar(6)= NULL,
	@num_ses	int=0,
	@cod_emp	char(15)= NULL,
	@cod_cia	char(3)= NULL,
	@cod_cli	char(15)= NULL,
	@cod_suc	char(3)= NULL,
	--
	@motRechazoConfirma	NVARCHAR(400) = NULL,
	@indAsistio			BIT=0,
	@motInasistencia	NVARCHAR(MAX)=NULL 
	
--WITH ENCRYPTION	
AS
BEGIN
	
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

	IF (@opcion='DatosConfirmarAsistencia')
	BEGIN
		SELECT	
				--/*
				EI.anio, rtrim(EI.version) version, EI.cons, EI.cod_cia, EI.cod_cli, EI.cod_suc, EI.num_ses, 
				rtrim(EI.cod_even) as cod_even,--Cod Evento
				EI.cod_emp, --Cod Empleado
				EB.nom_even,--Nombre Evento
				CONCAT(E.nom_emp,' ',E.ap1_emp,' ',E.ap2_emp) AS NOMBRE, --Nombre Empleado
				EI.ind_asis, -- Ind Asistencia
				EI.cod_conf, -- Codigo Estado Asistencia 
				CA.descripcion, -- Descrip Estado Asistencia
				EB.Cod_est AS cod_EstadoEvento, -- Estado Evento
				ES.Des_Est AS des_EstadoEvento, -- Des Estado Evento
				EP.fec_ses AS fechaSesionProgramacion, -- Fec sesion Programacion Evento
				EB.obj_even, --Descripcion Objetivo Evento
				
				EB.cod_instruc,--InstructorResponsable
				CONCAT(REB.nom_emp,' ',REB.ap1_emp,' ',REB.ap2_emp) AS NomInstructor, --Nombre Instructor
				EB.Entidad--Entidad
				--*/
			FROM SST_EventosInvita EI
			INNER JOIN SST_Eventos EB ON EB.anio = EI.anio and EB.version = EI.version and EB.cons=EI.cons and EB.cod_even=EI.cod_even 
									and EB.cod_cia=EI.cod_cia and EB.cod_cli=EI.cod_cli and EB.cod_suc=EI.cod_suc 
			INNER JOIN SST_EventosProg EP ON EP.anio=EI.anio and EP.version=EI.version and EP.cons=EI.cons and EP.cod_even=EI.cod_even 
									and EP.cod_cia=EI.cod_cia and EP.cod_cli = EI.cod_cli and EP.cod_suc = EI.cod_suc and EP.num_ses = EI.num_ses
			INNER JOIN rhh_emplea E ON EI.cod_emp= E.cod_emp
			INNER JOIN rhh_emplea REB ON EB.cod_instruc= REB.cod_emp
			INNER JOIN GTH_Confirma_Asistencia CA ON EI.cod_conf = CA.cod_conf
			INNER JOIN GTH_Estados ES ON EB.Cod_est = ES.cod_est
			
		WHERE EB.Cod_est in ('05','07') 
			AND EP.fec_ses > GETDATE()
			AND EI.cod_conf='03'
			AND EI.cod_emp = @cod_emp --'1006068795'

			
	END
	
	IF (@opcion='ConfirmarAsistencia')
	BEGIN
		--select * from GTH_EventoInvita where cod_even='eve' and cod_emp='1018465875'
		
		update SST_EventosInvita set cod_conf='01',cod_estado='01', motivo_rech = @motRechazoConfirma
			WHERE  anio = @anio
				AND version = @version
				AND cons = @cons 
				AND cod_even = @cod_even
				AND num_ses = @num_ses
				AND cod_emp = @cod_emp
				AND cod_cia = @cod_cia
				AND cod_cli = @cod_cli
				AND cod_suc = @cod_suc

			
	END

	IF (@opcion='RechazaAsistencia')
	BEGIN
		/* CONSULTAS DE LOS ESTADOS
		select * from GTH_Inscripcion_Evento
		select * from GTH_Confirma_Asistencia
		*/
		update SST_EventosInvita set cod_conf='02', xq_no_asis = @motRechazoConfirma
			WHERE  anio = @anio
				AND version = @version
				AND cons = @cons 
				AND cod_even = @cod_even
				AND num_ses = @num_ses
				AND cod_emp = @cod_emp
				AND cod_cia = @cod_cia
				AND cod_cli = @cod_cli
				AND cod_suc = @cod_suc
	END

	IF (@opcion='DatosMacarAsistencia')
	BEGIN

		SELECT	
				EI.anio, rtrim(EI.version) version, EI.cons, EI.cod_cia, EI.cod_cli, EI.cod_suc, EI.num_ses, 
				rtrim(EI.cod_even) as cod_even,--Cod Evento
				EI.cod_emp, --Cod Empleado
				EB.nom_even,--Nombre Evento
				CONCAT(E.nom_emp,' ',E.ap1_emp,' ',E.ap2_emp) AS NOMBRE, --Nombre Empleado
				EI.ind_asis, -- Ind Asistencia
				EI.cod_conf, -- Codigo Estado Asistencia 
				CA.descripcion, -- Descrip Estado Asistencia
				EB.Cod_est AS cod_EstadoEvento, -- Estado Evento
				ES.Des_Est AS des_EstadoEvento, -- Des Estado Evento
				EP.fec_ses AS fechaSesionProgramacion, -- Fec sesion Programacion Evento
				EP.fec_eje AS fechaEjecucion, -- Fec sesion Programacion Evento
				EB.obj_even, --Descripcion Objetivo Evento
				
				EB.cod_instruc,--InstructorResponsable
				CONCAT(REB.nom_emp,' ',REB.ap1_emp,' ',REB.ap2_emp) AS NomInstructor, --Nombre Instructor
				EB.Entidad--Entidad
			FROM SST_EventosInvita EI
			INNER JOIN SST_Eventos EB ON EB.anio = EI.anio and EB.version = EI.version and EB.cons=EI.cons and EB.cod_even=EI.cod_even 
									and EB.cod_cia=EI.cod_cia and EB.cod_cli=EI.cod_cli and EB.cod_suc=EI.cod_suc 
			INNER JOIN SST_EventosProg EP ON EP.anio=EI.anio and EP.version=EI.version and EP.cons=EI.cons and EP.cod_even=EI.cod_even 
									and EP.cod_cia=EI.cod_cia and EP.cod_cli = EI.cod_cli and EP.cod_suc = EI.cod_suc and EP.num_ses = EI.num_ses
			INNER JOIN rhh_emplea E ON EI.cod_emp= E.cod_emp
			INNER JOIN rhh_emplea REB ON EB.cod_instruc= REB.cod_emp
			INNER JOIN GTH_Confirma_Asistencia CA ON EI.cod_conf = CA.cod_conf
			INNER JOIN GTH_Estados ES ON EB.Cod_est = ES.cod_est
		
		WHERE	EI.cod_emp = '1018465875'--@cod_emp
				AND EP.fec_eje < GETDATE() AND EP.fec_ses < GETDATE() 
				AND EI.cod_estado = '01' --INSCRITO
				AND EI.cod_conf = '01' --Si Asistirá
				AND EI.ind_asis = 0 
				AND (LEN(EI.mot_inasis)=0 OR EI.mot_inasis IS NULL)
				AND (LEN(EI.xq_no_asis)=0 OR EI.xq_no_asis IS NULL)
		

	END

	IF (@opcion='MarcaAsistencia')
	BEGIN

		UPDATE SST_EventosInvita 
			SET ind_asis = @indAsistio, 
				mot_inasis = @motRechazoConfirma,
				xq_no_asis = @motRechazoConfirma
	
		WHERE  anio = @anio
				AND version = @version
				AND cons = @cons 
				AND cod_even = @cod_even
				AND num_ses = @num_ses
				AND cod_emp = @cod_emp
				AND cod_cia = @cod_cia
				AND cod_cli = @cod_cli
				AND cod_suc = @cod_suc


	END

END

```
