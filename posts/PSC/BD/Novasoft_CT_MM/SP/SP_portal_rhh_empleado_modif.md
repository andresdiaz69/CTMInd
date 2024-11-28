# Stored Procedure: SP_portal_rhh_empleado_modif

## Usa los objetos:
- [[gen_usuarios]]
- [[prt_Portal_Historial_DatosBasicos]]
- [[rhh_emplea]]
- [[rhh_portal_emplea]]

```sql

-- =============================================
-- Author:		David Alarcon Betancur
-- Create date:	12-08-2011
-- Description:	Modifica o inserta cambios del portal
-- joramirez ABR/2014 Se agrega campo de foto faltante
-- Jessy Peralta Sept/19 Se realiza la validacion para la modificacion o eliminacion de los registros que no han sido modificados

--Modify by:	Alexander Vargas
--Modify date:	26/01/2021
--Description:	Se agrega validacion para cuando los datos son iguales y el
--				empleado no realiza cambios

--Modify by:	Alexander Vargas
--Modify date:	04/04/2021
--Description:	Se agrega parametro foto actual para
--				guardar la foto comprimida en rhh_emplea y 
--				resolver los problemas de autorización de HV 
--				asociados a foto de tamaño muy grande

--SRS2021-0270	Problema actualizar campo avi_emp nulo en Enterprise
--Modify by:	Alexander Vargas
--Modify date:	05/04/2021
--Description:	Se agrega vaidacion de campo avi_emp nulo en
--				Enterprise cuando guardan los datos basicos desde portal

--SPA agregar campos a HV Empleados - Datos básicos
--Modified by: Alexander Vargas
--Modified date:	24/02/2023
--Description: se agregan campos en la actualización
--de datos

--SPA Estado autorizacion HV
--Modified by: Alexander Vargas
--Modified date:	18/04/2023
--Description: al crear un nuevo registro en la tabla rhh_portal_emplea
--el estado se envía en 1-Pendiente

--SPA agregar campos a HV Empleados y candidatos
--Modified by: Alexander Vargas
--Modified date:	04/05/2023
--Description: se agregan los campos ind_prepens,ind_cab_fam e ind_mascota a la consulta 
--de datos básicos
-- =============================================
CREATE PROCEDURE [dbo].[SP_portal_rhh_empleado_modif] @loginEmplea    NVARCHAR(20), 
                                                     @est_civ        SMALLINT, 
                                                     @dir_res        CHAR(100), 
                                                     @tel_res        VARCHAR(50), 
                                                     @pai_res        CHAR(3), 
                                                     @dpt_res        CHAR(2), 
                                                     @ciu_res        CHAR(5), 
                                                     @per_car        SMALLINT, 
                                                     @e_mail         VARCHAR(100), 
                                                     @tel_cel        VARCHAR(50), 
                                                     @barrio         VARCHAR(50), 
                                                     @ind_DecRenta   CHAR(1), 
                                                     @avi_emp        CHAR(150), 
                                                     @fto_emp        VARBINARY(MAX), 
                                                     @fto_emp_actual VARBINARY(MAX), 
                                                     @fec_expdoc     VARCHAR(8), 
                                                     @num_lib        VARCHAR(12), 
                                                     @cla_lib        INT, 
                                                     @dim_lib        INT, 
                                                     @gru_san        VARCHAR(3), 
                                                     @fac_rhh        CHAR(1), 
                                                     @nac_emp        INT, 
                                                     @e_mail_alt     VARCHAR(100), 
                                                     @tam_emp        NUMERIC(6, 2), 
                                                     @pes_emp        NUMERIC(6, 2), 
                                                     @sex_emp        INT, 
                                                     @pto_gas        MONEY, 
                                                     @deudas         BIT, 
                                                     @Cpto_deudas    NVARCHAR(MAX), 
                                                     @ind_prepens    BIT, 
                                                     @ind_cab_fam    BIT, 
                                                     @ind_mascota    BIT 
--WITH ENCRYPTION
AS
    BEGIN
        DECLARE @cod_emp CHAR(12);
        SELECT @cod_emp = cod_emp
        FROM gen_usuarios
        WHERE RTRIM(log_usu) LIKE @loginEmplea;
        DECLARE @foto_enterprise VARBINARY(MAX);
        SELECT @foto_enterprise = fto_emp
        FROM rhh_emplea
        WHERE cod_emp = @cod_emp;
        IF(NOT EXISTS
        (
            SELECT cod_emp
            FROM rhh_portal_emplea
            WHERE cod_emp = @cod_Emp
        ))
            BEGIN
                INSERT INTO rhh_portal_emplea
                (cod_emp, 
                 est_civ, 
                 dir_res, 
                 tel_res, 
                 pai_res, 
                 dpt_res, 
                 ciu_res, 
                 per_car, 
                 e_mail, 
                 tel_cel, 
                 barrio, 
                 ind_DecRenta, 
                 avi_emp, 
                 fto_emp, 
                 fec_expdoc, 
                 cla_lib, 
                 num_lib, 
                 dim_lib, 
                 gru_san, 
                 nac_emp, 
                 e_mail_alt, 
                 tam_emp, 
                 pes_emp, 
                 sex_emp, 
                 pto_gas, 
                 deudas, 
                 Cpto_deudas, 
                 fac_rhh, 
                 cod_estado, 
                 ind_prepens, 
                 ind_cab_fam, 
                 ind_mascota
                )
                VALUES
                (@cod_emp, 
                 @est_civ, 
                 @dir_res, 
                 @tel_res, 
                 @pai_res, 
                 @dpt_res, 
                 @ciu_res, 
                 @per_car, 
                 @e_mail, 
                 @tel_cel, 
                 @barrio, 
                 @ind_DecRenta, 
                 @avi_emp, 
                 @fto_emp, 
                 @fec_expdoc, 
                 @cla_lib, 
                 @num_lib, 
                 @dim_lib, 
                 @gru_san, 
                 @nac_emp, 
                 @e_mail_alt, 
                 @tam_emp, 
                 @pes_emp, 
                 @sex_emp, 
                 @pto_gas, 
                 @deudas, 
                 @Cpto_deudas, 
                 @fac_rhh, 
                 1, 
                 @ind_prepens, 
                 @ind_cab_fam, 
                 @ind_mascota
                );
                --Para comprimir la foto que hay en Enterprise
                IF(@foto_enterprise <> @fto_emp_actual)
                    BEGIN
                        UPDATE rhh_emplea
                          SET 
                              fto_emp = @fto_emp_actual
                        WHERE cod_emp = @cod_emp;
                    END;
            END;
            ELSE
            IF NOT EXISTS
            (
                SELECT e.cod_emp, 
                       e.est_civ, 
                       e.dir_res, 
                       e.tel_res, 
                       e.pai_res, 
                       e.dpt_res, 
                       e.ciu_res, 
                       e.per_car, 
                       e.e_mail, 
                       e.tel_cel, 
                       e.barrio, 
                       e.ind_DecRenta, 
                       e.avi_emp, 
                       e.fto_emp, 
                       fec_expdoc, 
                       cla_lib, 
                       num_lib, 
                       dim_lib, 
                       gru_san, 
                       nac_emp, 
                       e_mail_alt, 
                       tam_emp, 
                       pes_emp, 
                       sex_emp, 
                       pto_gas, 
                       deudas, 
                       Cpto_deudas, 
                       fac_rhh, 
                       ind_prepens, 
                       ind_cab_fam, 
                       ind_mascota
                FROM rhh_emplea e 
                --INNER JOIN rhh_portal_emplea ep ON e.cod_emp=ep.cod_emp
                WHERE e.cod_emp = @cod_emp
                      AND (e.est_civ <> @est_civ
                           OR e.dir_res <> @dir_res
                           OR e.tel_res <> @tel_res
                           OR e.pai_res <> @pai_res
                           OR e.dpt_res <> @dpt_res
                           OR e.ciu_res <> @ciu_res
                           OR e.per_car <> @per_car
                           OR e.e_mail <> @e_mail
                           OR e.tel_cel <> @tel_cel
                           OR e.barrio <> @barrio
                           OR e.ind_DecRenta <> @ind_DecRenta
                           OR e.avi_emp <> @avi_emp
                           OR e.fto_emp <> @fto_emp)
            )
                BEGIN
                    DELETE rhh_portal_emplea
                    WHERE cod_emp = @cod_emp;
                END;
                ELSE
                BEGIN
                    UPDATE rhh_portal_emplea
                      SET 
                          [est_civ] = @est_civ, 
                          [dir_res] = @dir_res, 
                          [tel_res] = @tel_res, 
                          [pai_res] = @pai_res, 
                          [dpt_res] = @dpt_res, 
                          [ciu_res] = @ciu_res, 
                          [per_car] = @per_car, 
                          [e_mail] = @e_mail, 
                          [tel_cel] = @tel_cel, 
                          [barrio] = @barrio, 
                          [ind_DecRenta] = @ind_DecRenta, 
                          [avi_emp] = @avi_emp, 
                          [fto_emp] = @fto_emp, 
                          [fec_expdoc] = @fec_expdoc, 
                          [num_lib] = @num_lib, 
                          [cla_lib] = @cla_lib, 
                          [dim_lib] = @dim_lib, 
                          [gru_san] = @gru_san, 
                          [fac_rhh] = @fac_rhh, 
                          [nac_emp] = @nac_emp, 
                          [e_mail_alt] = @e_mail_alt, 
                          [tam_emp] = @tam_emp, 
                          [pes_emp] = @pes_emp, 
                          [sex_emp] = @sex_emp, 
                          [pto_gas] = @pto_gas, 
                          [deudas] = @deudas, 
                          [Cpto_deudas] = @Cpto_deudas, 
                          [ind_prepens] = @ind_prepens, 
                          [ind_cab_fam] = @ind_cab_fam, 
                          [ind_mascota] = @ind_mascota
                    WHERE [cod_emp] = @cod_emp;

                    --Para comprimir la foto que hay en Enterprise
                    IF(@foto_enterprise <> @fto_emp_actual)
                        BEGIN
                            --print('actualiza')
                            UPDATE rhh_emplea
                              SET 
                                  fto_emp = @fto_emp_actual
                            WHERE cod_emp = @cod_emp;
                        END;
                END;

        --Si los registros son iguales entonces lo elimina de la tabla de portal para que
        --no se muestre como un cambio pendiente

        IF NOT EXISTS
        (
            SELECT cod_emp, 
                   est_civ, 
                   tel_res, 
                   e_mail, 
                   tel_cel, 
                   avi_emp, 
                   fto_emp, 
                   fec_expdoc, 
                   cla_lib, 
                   num_lib, 
                   dim_lib, 
                   gru_san, 
                   nac_emp, 
                   e_mail_alt, 
                   tam_emp, 
                   pes_emp, 
                   sex_emp, 
                   fac_rhh, 
                   ind_prepens, 
                   ind_cab_fam, 
                   ind_mascota
            FROM rhh_portal_emplea
            WHERE cod_emp = @cod_emp
            EXCEPT
            SELECT cod_emp, 
                   est_civ, 
                   tel_res, 
                   e_mail, 
                   tel_cel, 
                   ISNULL(avi_emp, '') AS avi_emp, 
                   fto_emp, 
                   fec_expdoc, 
                   cla_lib, 
                   num_lib, 
                   dim_lib, 
                   gru_san, 
                   nac_emp, 
                   e_mail_alt, 
                   tam_emp, 
                   pes_emp, 
                   sex_emp, 
                   fac_rhh, 
                   ISNULL(ind_prepens,0) AS ind_prepens, 
                   ISNULL(ind_cab_fam,0) AS ind_cab_fam, 
                   ISNULL(ind_mascota,0) AS ind_mascota
            FROM rhh_emplea
            WHERE cod_emp = @cod_emp
        )
            BEGIN
                DELETE rhh_portal_emplea
                WHERE cod_emp = @cod_emp;
                IF EXISTS
                (
                    SELECT *
                    FROM prt_Portal_Historial_DatosBasicos
                    WHERE RTRIM(cod_emp) = RTRIM(@cod_Emp)
                          AND cod_estado = 1
                )
                    BEGIN
                        UPDATE prt_Portal_Historial_DatosBasicos
                          SET 
                              cod_estado = 4, 
                              motivo = 'Anulado por el empleado', 
                              fec_proceso = GETDATE()
                        WHERE RTRIM(cod_emp) = RTRIM(@cod_Emp)
                              AND cod_estado = 1;
                    END;
            END;
    END;

```
