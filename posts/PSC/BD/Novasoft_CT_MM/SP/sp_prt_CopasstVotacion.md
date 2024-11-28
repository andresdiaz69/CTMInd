# Stored Procedure: sp_prt_CopasstVotacion

## Usa los objetos:
- [[PRT_EmpleadosVotaron]]
- [[rhh_cargos]]
- [[rhh_emplea]]
- [[SST_ConvocatCopasst]]
- [[SST_PostConvCopasst]]

```sql



-- =============================================
-- Author:		<Jessy Peralta>
-- Create date: <Octubre 2019>
-- Description:	<Valida, consulta, modifica y inserta los empleados que desean votar o que se estan postulando al comite de convivencia de seguridad y salud en el trabajo (SST),>

--SPA2021-0256 Agregar columna donde se visualice por quien votó la persona
--Modify date: Alexander Vargas
--Modify date:	09/11/2021
--Description: Se agrega valor @cod_postulado para dejar
--				registrado por quien votó el empleado.
--				Esto se realiza en la opción INSERTA de
--				este procedimiento
-- =============================================
CREATE PROCEDURE [dbo].[sp_prt_CopasstVotacion]
	
	@BDPortal			VARCHAR(50)='portal',
	@cod_conv_copasst	INT='1',
	@op					VARCHAR(20)='CONSULTA',
	@cod_cia			CHAR(3)='%',
	@cod_postulado		CHAR(12)='%',
	@cod_emp			CHAR(12)='%',
	@cod_suc			CHAR(3)='%'
--WITH ENCRYPTION	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
		
	IF @cod_suc ='%'
	    select @cod_cia = cod_cia, @cod_suc = cod_suc from rhh_emplea where cod_emp=@cod_emp
	
	select @cod_cia = cod_cia from rhh_emplea where cod_emp=@cod_emp
	
		
    
	IF(@op = 'CONSULTAR') --cunsulta para mostrar las convocatorias que estan activas para postularse
	BEGIN
		SELECT cod_conv_copasst,cod_cia,fec_crea,fec_venc,desc_conv,cant_votos,cant_vot_null,cant_vot_blanco,fec_ini as InicioVotacion,fec_fin as FinVotacion
		FROM SST_ConvocatCopasst 
		WHERE fec_ini <= GETDATE() and ISNULL(fec_fin,GETDATE()+1) >= dateadd(d,0,datediff(d,0,getdate())) AND cod_cia = rtrim(@cod_cia)
	END

	IF (@op = 'POSTULADOS')
	BEGIN
		SELECT ROW_NUMBER() OVER(ORDER BY cod_conv_copasst ASC) identificador, cod_conv_copasst,p.cod_emp as codigo,CONCAT(rtrim(e.nom_emp),' ',rtrim(ap1_emp),' ',rtrim(ap2_emp)) as nombre,c.nom_car AS cargo,
				e.fto_emp as Foto
		FROM SST_PostConvCopasst p
			INNER JOIN rhh_emplea e ON e.cod_emp=p.cod_emp COLLATE DATABASE_DEFAULT 
			Inner join rhh_cargos c ON e.cod_car=c.cod_car COLLATE DATABASE_DEFAULT 
		WHERE cod_conv_copasst = @cod_conv_copasst
			UNION ALL
		SELECT 
		0 identificador, @cod_conv_copasst cod_conv_comite,'000000000'codigo,'Voto en Blanco'nombre,'' cargo,NULL foto
	END
	
	IF (@op = 'INSERTA')
	BEGIN
	
		IF(@cod_postulado <> '000000000')
		BEGIN
			UPDATE SST_PostConvCopasst SET  num_votos= (ISNULL(num_votos,0)+1)
			WHERE cod_conv_copasst= @cod_conv_copasst and cod_emp= @cod_postulado and cod_cia= @cod_cia

			--UPDATE SST_ConvocatComite set cant_votos=(isnull(cant_votos,0)+1) where cod_conv_comite= @cod_conv_comite and cod_cia= @cod_cia
			
			INSERT INTO PRT_EmpleadosVotaron values (@cod_conv_copasst,'Copasst',@cod_emp,@cod_cia,@cod_postulado)

		END
		ELSE
		BEGIN
			UPDATE SST_ConvocatCopasst set cant_vot_blanco=(isnull(cant_vot_blanco,0)+1) where cod_conv_copasst= @cod_conv_copasst and cod_cia= @cod_cia
			INSERT INTO PRT_EmpleadosVotaron values (@cod_conv_copasst,'Copasst',@cod_emp,@cod_cia,0) --El 0 es para voto en blanco
		END			
	END
	
	IF (@op = 'YAVOTO')
	BEGIN
		SELECT CASE WHEN COUNT(cod_conv_comite)= 0 THEN 0 ELSE 1 END VALIDACION 
		FROM PRT_EmpleadosVotaron 
		WHERE cod_conv_comite = rtrim(@cod_conv_copasst) and cod_empSufragante = RTRIM(@cod_emp) and cod_cia=rtrim(@cod_cia) and nom_comite='COPASST'
	END
END

```
